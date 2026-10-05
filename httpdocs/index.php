<?php

declare(strict_types=1);

require_once __DIR__ . '/Modules.php';

use Subactor\Saas\Config\PortalConfig;
use Subactor\Saas\Domain\Normalizer;
use Subactor\Saas\Domain\Plans;
use Subactor\Saas\Domain\PromoEngine;
use Subactor\Saas\Domain\ReflinkManager;
use Subactor\Saas\Poa\CommandDispatcher;
use Subactor\Saas\Poa\EventStore;
use Subactor\Saas\I18n\PreferencesResolver;
use Subactor\Saas\I18n\I18n;
use Subactor\Saas\Session\SessionManager;
use Subactor\Saas\Dsl\DslInterpreter;
use Subactor\Saas\Http\Request;
use Subactor\Saas\Http\Response;
use Subactor\Saas\Http\Router;
use Subactor\Saas\Notification\EmailNotificationService;
use Subactor\Saas\Domain\IntegrationConnections;
use Subactor\Saas\Domain\TenantHosting;
use Subactor\Saas\Domain\IdentityProviders;
use Subactor\Saas\Domain\NodeMarketplace;
use Subactor\Saas\Domain\NodeRegistry;
use Subactor\Saas\Control\PortalControlClient;

use Subactor\Saas\Session\OtpManager;

$config = PortalConfig::fromEnv();
$runtimeSecret = $config->runtimeHmacSecret();
$eventStore = new EventStore(storageDir: __DIR__ . '/cache/events');
$mailer = new EmailNotificationService($config);
$dispatcher = new CommandDispatcher($eventStore, $mailer);
$sessionMgr = new SessionManager(
    secret: $runtimeSecret,
    ttlSeconds: $config->sessionTtlSeconds,
    cookieSecure: $config->cookieSecure
);
$connections = new IntegrationConnections(
    secretKey: $runtimeSecret,
    storageDir: __DIR__ . '/cache/connections'
);
$hosting = new TenantHosting(storageDir: __DIR__ . '/cache/hosting');
$nodeRegistry = new NodeRegistry(storageDir: __DIR__ . '/cache/nodes');
$identity = new IdentityProviders(
    secret: $runtimeSecret,
    origin: $config->origin ?: 'http://127.0.0.1:8781',
    includeDevOnly: $config->environment === 'development',
    cookieSecure: $config->cookieSecure
);
$otpMgr = new OtpManager(notifier: $mailer, allowDevBypass: $config->allowsDevOtpExposure());
$dslInterpreter = new DslInterpreter($dispatcher, $sessionMgr, $connections, $hosting, $nodeRegistry, $otpMgr);
$withoutOtpSecrets = static function (array $payload): array {
    unset($payload['dev_otp'], $payload['otp']);
    if (isset($payload['result']) && is_array($payload['result'])) {
        unset($payload['result']['dev_otp'], $payload['result']['otp'], $payload['result']['code']);
    }
    return $payload;
};
$portalControl = new PortalControlClient(
    baseUrl: $config->controlUrl,
    token: $config->portalControlToken,
    timeoutMs: $config->controlTimeoutMs
);
$router = new Router();
$accountOrganizations = static function (string $email) use ($dispatcher): array {
    return array_map(static function (array $registration): array {
        $payload = is_array($registration['payload'] ?? null) ? $registration['payload'] : [];
        $slug = (string)($registration['aggregate_id'] ?? $payload['tenant_slug'] ?? '');
        $label = (string)($payload['tenant_label'] ?? $payload['organization_name'] ?? $payload['organisation_name'] ?? $slug);
        return [
            'organization_id' => (string)($payload['organization_id'] ?? ''),
            'slug' => $slug,
            'name' => $label,
            'plan' => (string)($payload['plan'] ?? Plans::PLAN_DEFAULT),
            'role' => 'owner',
        ];
    }, $dispatcher->registrationsForEmail($email));
};
$enrichSession = static function (array $session) use ($accountOrganizations): array {
    $session['organizations'] = $accountOrganizations((string)($session['email'] ?? ''));
    return $session;
};

// API Endpoints
$healthz = static function () {
    return Response::json(200, ['ok' => true, 'engine' => 'php-poa-cqrs', 'runtime' => 'PHP ' . PHP_VERSION, 'version' => '0.2.0']);
};
$router->get('/healthz', $healthz);
$router->get('/readyz', $healthz);
$router->get('/install/node/linux', static function () {
    $body = file_get_contents(__DIR__ . '/install/linux.sh');
    if ($body === false) return Response::json(404, ['ok' => false, 'error' => 'installer_not_found']);
    return new Response(200, [
        'Content-Type' => 'text/x-shellscript; charset=utf-8',
        'Cache-Control' => 'public, max-age=300',
        'X-Content-Type-Options' => 'nosniff',
    ], $body);
});
$router->get('/install/node/windows', static function () {
    $body = file_get_contents(__DIR__ . '/install/windows.ps1');
    if ($body === false) return Response::json(404, ['ok' => false, 'error' => 'installer_not_found']);
    return new Response(200, [
        'Content-Type' => 'text/plain; charset=utf-8',
        'Cache-Control' => 'public, max-age=300',
        'X-Content-Type-Options' => 'nosniff',
    ], $body);
});

$router->get('/api/config', function () use ($config) {
    return Response::json(200, [
        'ok' => true,
        'domain' => $config->domain,
        'plans' => array_values(Plans::all('month')),
        'annual_plans' => array_values(Plans::all('year')),
        'payment' => [
            'enabled' => $config->paymentProvider !== 'disabled',
            'provider' => $config->paymentProvider,
        ],
    ]);
});

$router->get('/api/promo/validate', function (Request $req) {
    $code = $req->query('code', '');
    $promo = PromoEngine::validate($code);
    if (!$promo) {
        return Response::json(404, ['ok' => false, 'error' => 'invalid_promo_code']);
    }
    return Response::json(200, ['ok' => true, 'promo' => $promo]);
});

$router->post('/api/access/request', function (Request $req) use ($dispatcher) {
    $body = $req->json();
    $res = $dispatcher->dispatch('CreateTenant', $body);
    if (($res['ok'] ?? false) !== true) {
        return Response::json(409, $res);
    }
    return Response::json(200, $res);
});

$router->post('/api/access/request-otp', function (Request $req) use ($dslInterpreter, $withoutOtpSecrets) {
    $result = $dslInterpreter->execute(['command' => 'REQUEST_OTP', 'payload' => $req->json()]);
    if (!($result['ok'] ?? false)) {
        $code = (string)($result['error']['code'] ?? '');
        // Delivery outage is not an auth failure — avoid opaque 401 from the wrong layer.
        $status = $code === 'DSL-AUTH-004' ? 503 : 401;
        $payload = [
            'ok' => false,
            'error' => $result['error']['message'] ?? 'Invalid email address',
        ];
        if ($code !== '') {
            $payload['code'] = $code;
        }
        return Response::json($status, $payload);
    }
    return Response::json(200, $withoutOtpSecrets($result));
});

$router->post('/api/access/verify-otp', function (Request $req) use ($dslInterpreter) {
    $result = $dslInterpreter->execute(['command' => 'VERIFY_OTP', 'payload' => $req->json()]);
    if (!($result['ok'] ?? false)) {
        $code = (string)($result['error']['code'] ?? '');
        $status = $code === 'DSL-AUTH-004' ? 503 : 401;
        $payload = [
            'ok' => false,
            'error' => $result['error']['message'] ?? 'Invalid or expired OTP code',
        ];
        if ($code !== '') {
            $payload['code'] = $code;
        }
        return Response::json($status, $payload);
    }
    $session = is_array($result['result'] ?? null) ? $result['result'] : [];
    return Response::json(200, [
        'ok' => true,
        'session' => $session,
    ])->withHeader('Set-Cookie', (string)($session['cookie'] ?? ''));
});

$router->post('/api/access/login', function (Request $req) use ($dslInterpreter) {
    $result = $dslInterpreter->execute(['command' => 'LOGIN', 'payload' => $req->json()]);
    if (!($result['ok'] ?? false)) {
        $code = (string)($result['error']['code'] ?? '');
        $status = $code === 'DSL-AUTH-004' ? 503 : 401;
        $payload = [
            'ok' => false,
            'error' => $result['error']['message'] ?? 'Invalid email or organisation identifier',
        ];
        if ($code !== '') {
            $payload['code'] = $code;
        }
        return Response::json($status, $payload);
    }
    if ($result['requires_otp'] ?? false) {
        $payload = [
            'ok' => true,
            'requires_otp' => true,
            'message' => $result['result']['message'] ?? 'Kod OTP został wysłany.',
        ];
        return Response::json(200, $payload);
    }
    $session = is_array($result['result'] ?? null) ? $result['result'] : [];
    return Response::json(200, [
        'ok' => true,
        'session' => $session,
    ])->withHeader('Set-Cookie', (string)($session['cookie'] ?? ''));
});

$router->get('/api/session', function (Request $req) use ($sessionMgr, $enrichSession) {
    $cookieHeader = $req->headers['cookie'] ?? $req->headers['Cookie'] ?? null;
    $payload = $sessionMgr->fromCookieHeader($cookieHeader);
    if (!$payload) {
        return Response::json(401, ['ok' => false, 'error' => 'no_session']);
    }
    return Response::json(200, ['ok' => true, 'session' => $enrichSession($payload)]);
});

$router->post('/api/organizations', function (Request $req) use ($sessionMgr, $dispatcher, $enrichSession) {
    $cookieHeader = $req->headers['cookie'] ?? $req->headers['Cookie'] ?? null;
    $session = $sessionMgr->fromCookieHeader($cookieHeader);
    if ($session === null) return Response::json(401, ['ok' => false, 'error' => 'session_required']);
    $memberships = $dispatcher->registrationsForEmail((string)($session['email'] ?? ''));
    $plan = Plans::selectOrDefault($session['plan'] ?? null);
    $organizationLimit = (int)($plan['max_orgs'] ?? 1);
    if ($organizationLimit > 0 && count($memberships) >= $organizationLimit) {
        return Response::json(409, [
            'ok' => false,
            'error' => 'organization_limit_reached',
            'limit' => $organizationLimit,
        ]);
    }
    try {
        $created = $dispatcher->dispatch('CreateOrganization', [
            'email' => (string)$session['email'],
            'tenant_label' => (string)($req->json()['tenant_label'] ?? ''),
            'plan' => (string)($session['plan'] ?? Plans::PLAN_DEFAULT),
            'billing_owner_tenant_slug' => (string)($session['tenant_slug'] ?? ''),
        ]);
    } catch (InvalidArgumentException $error) {
        return Response::json(422, ['ok' => false, 'error' => $error->getMessage()]);
    }
    if (($created['ok'] ?? false) !== true) return Response::json(409, $created);
    $tenant = (string)($created['aggregate_id'] ?? '');
    $next = $sessionMgr->create((string)$session['email'], $tenant, (string)$plan['id']);
    $verified = $sessionMgr->verify((string)$next['session_token']);
    if ($verified === null) return Response::json(500, ['ok' => false, 'error' => 'session_issue_failed']);
    return Response::json(201, [
        'ok' => true,
        'organization' => $created,
        'session' => $enrichSession($verified),
    ])->withHeader('Set-Cookie', (string)$next['cookie']);
});

$router->post('/api/organizations/switch', function (Request $req) use ($sessionMgr, $dispatcher, $enrichSession) {
    $session = $sessionMgr->fromCookieHeader($_SERVER['HTTP_COOKIE'] ?? null);
    if ($session === null) return Response::json(401, ['ok' => false, 'error' => 'session_required']);
    try {
        $target = Normalizer::normalizeTenantSlug((string)($req->json()['tenant_slug'] ?? ''));
    } catch (InvalidArgumentException) {
        return Response::json(400, ['ok' => false, 'error' => 'invalid_tenant_slug']);
    }
    $membership = null;
    foreach ($dispatcher->registrationsForEmail((string)($session['email'] ?? '')) as $registration) {
        if (hash_equals((string)($registration['aggregate_id'] ?? ''), $target)) {
            $membership = $registration;
            break;
        }
    }
    if ($membership === null) return Response::json(403, ['ok' => false, 'error' => 'organization_membership_required']);
    $payload = is_array($membership['payload'] ?? null) ? $membership['payload'] : [];
    $next = $sessionMgr->create(
        (string)$session['email'],
        $target,
        (string)($payload['plan'] ?? Plans::PLAN_DEFAULT)
    );
    $verified = $sessionMgr->verify((string)$next['session_token']);
    if ($verified === null) return Response::json(500, ['ok' => false, 'error' => 'session_issue_failed']);
    return Response::json(200, ['ok' => true, 'session' => $enrichSession($verified)])
        ->withHeader('Set-Cookie', (string)$next['cookie']);
});

$router->post('/api/chat/intent', function (Request $req) use ($sessionMgr, $portalControl) {
    $cookieHeader = $req->headers['cookie'] ?? $req->headers['Cookie'] ?? null;
    $session = $sessionMgr->fromCookieHeader($cookieHeader);
    if ($session === null) return Response::json(401, ['ok' => false, 'error' => 'session_required']);
    $body = $req->json();
    try {
        $result = $portalControl->resolveIntent(
            text: (string)($body['text'] ?? ''),
            tenant: (string)($session['tenant_slug'] ?? ''),
            history: is_array($body['history'] ?? null) ? $body['history'] : [],
            references: is_array($body['references'] ?? null) ? $body['references'] : []
        );
        return Response::json(200, [
            'ok' => true,
            'mode' => 'propose',
            'tenant' => (string)($session['tenant_slug'] ?? ''),
            'result' => $result,
        ]);
    } catch (InvalidArgumentException $error) {
        return Response::json(422, ['ok' => false, 'error' => $error->getMessage()]);
    } catch (RuntimeException $error) {
        $code = $error->getMessage();
        return Response::json($code === 'portal_control_not_configured' ? 503 : 502, ['ok' => false, 'error' => $code]);
    }
});

/**
 * Propose-only contextual chat → Planfile ticket + queue projection.
 * Never returns secrets, never sets execution_authorized, always requires
 * Founder delegation for mutation authority.
 */
$router->post('/api/panel/contextual-ticket', function (Request $req) use ($sessionMgr) {
    $cookieHeader = $req->headers['cookie'] ?? $req->headers['Cookie'] ?? null;
    $session = $sessionMgr->fromCookieHeader($cookieHeader);
    if ($session === null) {
        return Response::json(401, ['ok' => false, 'error' => 'session_required']);
    }
    $body = $req->json();
    $tab = strtolower(trim((string)($body['tab'] ?? '')));
    $message = trim((string)($body['message'] ?? ''));
    if ($tab === '' || !preg_match('/^[a-z0-9-]{1,48}$/', $tab)) {
        return Response::json(422, ['ok' => false, 'error' => 'invalid_tab']);
    }
    if ($message === '' || strlen($message) > 2000) {
        return Response::json(422, ['ok' => false, 'error' => 'invalid_message']);
    }
    $priority = strtolower(trim((string)($body['priority'] ?? 'normal')));
    if (!in_array($priority, ['normal', 'high', 'critical'], true)) {
        $priority = 'normal';
    }
    $tenant = (string)($session['tenant_slug'] ?? '');
    $planfileBase = rtrim((string)(getenv('PLANFILE_URL') ?: 'http://127.0.0.1:8765'), '/');
    $ticketName = sprintf('[panel:%s] %s', $tab, substr($message, 0, 120));
    $description = "Contextual panel request (propose-only).\n"
        . "tab={$tab}\n"
        . "tenant={$tenant}\n"
        . "principal=session\n"
        . "execution_authorized=false\n"
        . "founder_delegation=required\n\n"
        . $message;
    $payload = json_encode([
        'name' => $ticketName,
        'description' => $description,
        'priority' => $priority,
        'labels' => ['contextual-chat', 'panel-' . $tab, 'propose-only'],
        'source' => [
            'tool' => 'www-sub-actor-panel',
            'version' => 'ticket-085',
            'context' => [
                'tab' => $tab,
                'tenant' => $tenant,
            ],
        ],
    ], JSON_THROW_ON_ERROR);
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\nAccept: application/json\r\n",
            'content' => $payload,
            'timeout' => 8,
            'ignore_errors' => true,
        ],
    ]);
    $raw = @file_get_contents($planfileBase . '/tickets', false, $context);
    if ($raw === false) {
        return Response::json(503, ['ok' => false, 'error' => 'planfile_unreachable']);
    }
    $created = json_decode($raw, true);
    $ticketId = is_array($created) ? (string)($created['id'] ?? '') : '';
    if ($ticketId === '' || !preg_match('/^PLF-[1-9][0-9]{0,8}$/', $ticketId)) {
        return Response::json(502, ['ok' => false, 'error' => 'planfile_ticket_invalid']);
    }
    $now = new DateTimeImmutable('now', new DateTimeZone('UTC'));
    $reportId = sprintf(
        '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        random_int(0, 0xffff),
        random_int(0, 0xffff),
        random_int(0, 0xffff),
        random_int(0, 0x0fff) | 0x4000,
        random_int(0, 0x3fff) | 0x8000,
        random_int(0, 0xffff),
        random_int(0, 0xffff),
        random_int(0, 0xffff)
    );
    $projection = [
        'schema' => 'subactor.contextual-ticket-projection/v1',
        'ticket_id' => $ticketId,
        'report_id' => $reportId,
        'observed_at' => $now->format('Y-m-d\TH:i:s.v\Z'),
        'valid_until' => $now->modify('+24 hours')->format('Y-m-d\TH:i:s.v\Z'),
        'priority' => $priority,
        'execution_state' => 'ready',
        'blocked_dependencies' => 0,
        'retry_count' => 0,
        'founder_delegation' => 'required',
    ];
    $receipt = [
        'ticket_id' => $ticketId,
        'report_id' => $reportId,
        'tab' => $tab,
        'tenant' => $tenant,
        'priority' => $priority,
        'observed_at' => $projection['observed_at'],
        'valid_until' => $projection['valid_until'],
        'execution_authorized' => false,
        'founder_delegation' => 'required',
        'mode' => 'propose',
    ];
    $storeDir = __DIR__ . '/cache/contextual-receipts';
    if (!is_dir($storeDir)) {
        @mkdir($storeDir, 0700, true);
    }
    $safeTenant = preg_replace('/[^a-z0-9_-]/i', '_', $tenant) ?: 'unknown';
    $storePath = $storeDir . '/' . $safeTenant . '.jsonl';
    @file_put_contents($storePath, json_encode($receipt, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
    if (is_file($storePath)) {
        $lines = @file($storePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
        if (count($lines) > 40) {
            @file_put_contents($storePath, implode("\n", array_slice($lines, -40)) . "\n", LOCK_EX);
        }
    }
    return Response::json(201, [
        'ok' => true,
        'mode' => 'propose',
        'execution_authorized' => false,
        'ticket_id' => $ticketId,
        'tab' => $tab,
        'projection' => $projection,
        'receipt' => $receipt,
    ]);
});

$router->get('/api/panel/contextual-receipts', function (Request $req) use ($sessionMgr) {
    $cookieHeader = $req->headers['cookie'] ?? $req->headers['Cookie'] ?? null;
    $session = $sessionMgr->fromCookieHeader($cookieHeader);
    if ($session === null) {
        return Response::json(401, ['ok' => false, 'error' => 'session_required']);
    }
    $tenant = (string)($session['tenant_slug'] ?? '');
    $safeTenant = preg_replace('/[^a-z0-9_-]/i', '_', $tenant) ?: 'unknown';
    $storePath = __DIR__ . '/cache/contextual-receipts/' . $safeTenant . '.jsonl';
    $receipts = [];
    if (is_file($storePath)) {
        $lines = @file($storePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [];
        foreach (array_reverse($lines) as $line) {
            $row = json_decode($line, true);
            if (!is_array($row)) {
                continue;
            }
            // Never resurface free-text prompts — only auditable metadata.
            $receipts[] = [
                'ticket_id' => (string)($row['ticket_id'] ?? ''),
                'report_id' => (string)($row['report_id'] ?? ''),
                'tab' => (string)($row['tab'] ?? ''),
                'priority' => (string)($row['priority'] ?? 'normal'),
                'observed_at' => (string)($row['observed_at'] ?? ''),
                'valid_until' => (string)($row['valid_until'] ?? ''),
                'execution_authorized' => false,
                'founder_delegation' => (string)($row['founder_delegation'] ?? 'required'),
                'mode' => 'propose',
            ];
            if (count($receipts) >= 40) {
                break;
            }
        }
    }
    return Response::json(200, [
        'ok' => true,
        'tenant' => $tenant,
        'receipts' => $receipts,
    ]);
});

$router->get('/api/llm-credentials', function (Request $req) use ($sessionMgr, $portalControl) {
    $cookieHeader = $req->headers['cookie'] ?? $req->headers['Cookie'] ?? null;
    $session = $sessionMgr->fromCookieHeader($cookieHeader);
    if ($session === null) return Response::json(401, ['ok' => false, 'error' => 'session_required']);
    try {
        return Response::json(200, $portalControl->listLlmCredentials((string)($session['tenant_slug'] ?? '')));
    } catch (InvalidArgumentException $error) {
        return Response::json(422, ['ok' => false, 'error' => $error->getMessage()]);
    } catch (RuntimeException $error) {
        $code = $error->getMessage();
        if ($code === 'portal_control_not_configured') {
            return Response::json(200, ['ok' => true, 'control' => 'not_configured', 'credentials' => []]);
        }
        return Response::json(502, ['ok' => false, 'error' => $code]);
    }
});

$router->post('/api/llm-credentials', function (Request $req) use ($sessionMgr, $portalControl) {
    $cookieHeader = $req->headers['cookie'] ?? $req->headers['Cookie'] ?? null;
    $session = $sessionMgr->fromCookieHeader($cookieHeader);
    if ($session === null) return Response::json(401, ['ok' => false, 'error' => 'session_required']);
    try {
        return Response::json(201, $portalControl->createLlmCredential(
            (string)($session['tenant_slug'] ?? ''),
            $req->json()
        ));
    } catch (InvalidArgumentException $error) {
        return Response::json(422, ['ok' => false, 'error' => $error->getMessage()]);
    } catch (RuntimeException $error) {
        $code = $error->getMessage();
        return Response::json($code === 'portal_control_not_configured' ? 503 : 502, ['ok' => false, 'error' => $code]);
    }
});

$router->post('/api/access/logout', function (Request $req) use ($sessionMgr) {
    return Response::json(200, ['ok' => true])
        ->withHeader('Set-Cookie', $sessionMgr->destroyCookie());
});

// DSL Endpoints (subactor.portal-operations/v1)
$router->get('/api/dsl/schema', function () {
    return Response::json(200, [
        'ok' => true,
        'schema' => DslInterpreter::SCHEMA,
        'commands' => DslInterpreter::COMMANDS,
        'description' => 'Portal Operations DSL — JSON-based command dispatch to POA CQRS engine',
    ]);
});

$router->post('/api/dsl/execute', function (Request $req) use ($dslInterpreter, $withoutOtpSecrets) {
    $dsl = $req->json();
    if (isset($dsl['payload']) && is_array($dsl['payload'])) {
        $dsl['payload']['_cookie'] = $_SERVER['HTTP_COOKIE'] ?? null;
    } elseif (isset($dsl['command'])) {
        $dsl['payload'] = ['_cookie' => $_SERVER['HTTP_COOKIE'] ?? null];
    }
    if (!isset($dsl['command'])) {
        return Response::json(400, ['ok' => false, 'error' => ['code' => 'DSL-INVALID-001', 'message' => 'Missing "command" field']]);
    }
    $result = $withoutOtpSecrets($dslInterpreter->execute($dsl));
    $statusCode = $result['ok'] ? 200 : 400;
    $cookie = $result['result']['cookie'] ?? $result['result']['session']['cookie'] ?? null;
    if ($result['ok'] && is_string($cookie) && $cookie !== '') {
        return Response::json($statusCode, $result)->withHeader('Set-Cookie', $cookie);
    }
    return Response::json($statusCode, $result);
});

// --- External identity: one flow for every provider in config/identity.json ---
$router->get('/auth/*', function (Request $req) use ($identity, $dispatcher, $sessionMgr) {
    $path = parse_url($req->uri, PHP_URL_PATH) ?: '';
    if (preg_match('#^/auth/([a-z0-9-]+)/(start|callback)$#', $path, $m) !== 1) {
        return Response::json(404, ['ok' => false, 'error' => 'unknown_auth_route']);
    }
    [$providerId, $stage] = [$m[1], $m[2]];

    if ($stage === 'start') {
        try {
            $begun = $identity->beginAuthorization($providerId, $req->query('next') ?: '/?action=panel');
        } catch (\Throwable $e) {
            return Response::json(400, ['ok' => false, 'error' => $e->getMessage()]);
        }
        return (new Response(302, ['Location' => $begun['url']], ''))
            ->withHeader('Set-Cookie', $begun['cookie']);
    }

    $result = $identity->completeAuthorization(
        $providerId,
        (string)$req->query('code'),
        (string)$req->query('state'),
        $_SERVER['HTTP_COOKIE'] ?? null
    );
    if (($result['ok'] ?? false) !== true) {
        return Response::json(400, ['ok' => false, 'error' => $result['error'] ?? 'authorization_failed']);
    }

    // A returning address signs in; a new one is provisioned from its domain.
    $tenant = IdentityProviders::tenantFromEmail($result['email']);
    $registration = $dispatcher->registrationFor($tenant);
    if ($registration !== null && strtolower((string)($registration['payload']['email'] ?? '')) !== $result['email']) {
        return Response::json(409, ['ok' => false, 'error' => 'organisation_identifier_collision']);
    }
    if ($registration === null) {
        $created = $dispatcher->dispatch('CreateTenant', [
            'email' => $result['email'],
            'tenant_slug' => $tenant,
            'plan' => Plans::PLAN_DEFAULT,
            'promo_code' => 'NOCC100',
            'identity_provider' => $providerId,
        ]);
        if (($created['ok'] ?? false) !== true) {
            return Response::json(409, ['ok' => false, 'error' => 'organisation_identifier_collision']);
        }
        $registration = $dispatcher->registrationFor($tenant);
    }
    $plan = (string)($registration['payload']['plan'] ?? Plans::PLAN_DEFAULT);
    $session = $sessionMgr->create($result['email'], $tenant, $plan ?: Plans::PLAN_DEFAULT);

    return (new Response(302, ['Location' => $result['next'] ?? '/?action=panel'], ''))
        ->withHeader('Set-Cookie', $session['cookie'])
        ->withHeader('Set-Cookie', $identity->clearStateCookie());
});


// Legal page (separate route, not a query action)
$router->get('/legal', function (Request $req) use ($sessionMgr, $accountOrganizations) {
    $locale = PreferencesResolver::negotiate(
        $req->query('lang'),
        PreferencesResolver::storedLocale($_SERVER['HTTP_COOKIE'] ?? null),
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? null
    );
    $dict = I18n::ui($locale);
    $h = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $session = $sessionMgr->fromCookieHeader($_SERVER['HTTP_COOKIE'] ?? null);
    $organizations = $session ? $accountOrganizations((string)($session['email'] ?? '')) : [];
    $homeUrl = $locale === 'pl' ? '/' : '/?lang=' . urlencode($locale);
    $backToHomeLabel = match ($locale) {
        'en' => 'Back to home',
        'de' => 'Zurück zur Startseite',
        default => 'Powrót na stronę główną',
    };
    $registrationNotice = trim((string)($dict['legal_registration_notice'] ?? ''));
    $title = $h((string)($dict['legal_title'] ?? 'Informacje prawne i zgodność UE'));
    $scopeLabel = $h((string)($dict['legal_scope_label'] ?? 'Zakres:'));
    $scopeNotice = $h((string)($dict['legal_scope_notice'] ?? ''));
    $legalSub = $h((string)($dict['legal_sub'] ?? ''));
    $partnerHint = $h((string)($dict['partner_path_hint'] ?? ''));
    $registrationTitle = $h((string)($dict['legal_registration_notice'] ?? 'Kontakt i aktywacja'));
    $registrationBody = $registrationNotice !== '' ? nl2br($h($registrationNotice)) : '';
    $lang = $h($locale);

    $sections = [
        ['legal_b2b_title', 'legal_b2b_desc'],
        ['legal_price_title', 'legal_price_desc'],
        ['legal_contract_title', 'legal_contract_desc'],
        ['legal_technical_title', 'legal_technical_desc'],
        ['legal_data_title', 'legal_data_desc'],
        ['legal_switch_title', 'legal_switch_desc'],
        ['legal_ai_title', 'legal_ai_desc'],
        ['legal_accessibility_title', 'legal_accessibility_desc'],
        ['legal_complaints_title', 'legal_complaints_desc'],
        ['legal_operator_title', 'legal_operator_desc'],
    ];

    $sectionsHtml = '';
    foreach ($sections as $pair) {
        [$titleKey, $descKey] = $pair;
        $title = trim((string)($dict[$titleKey] ?? ''));
        $desc = trim((string)($dict[$descKey] ?? ''));
        if ($title === '' || $desc === '') {
            continue;
        }
        $sectionsHtml .= sprintf(
            '<section class="legal-section"><h2>%s</h2><p>%s</p></section>',
            $h($title),
            nl2br($h($desc))
        );
    }

    $sources = '';
    $sourceKeys = [
        'legal_source_ecommerce',
        'legal_source_consumers',
        'legal_source_gdpr',
        'legal_source_accessibility',
        'legal_source_data_act',
        'legal_source_ai_act',
        'legal_source_polish_services',
    ];
    foreach ($sourceKeys as $sourceKey) {
        $item = trim((string)($dict[$sourceKey] ?? ''));
        if ($item !== '') {
            $sources .= '<li>' . $h($item) . '</li>';
        }
    }
    if ($sources !== '') {
        $sectionsHtml .= sprintf(
            '<section class="legal-section"><h2>%s</h2><ul class="legal-sources">%s</ul></section>',
            $h((string)($dict['legal_sources_title'] ?? '')),
            $sources
        );
    }
    $registrationNoticeHtml = $registrationBody !== '' ? '<p class="legal-cta">' . $registrationBody . '</p>' : '';
    $accountNavHtml = '';
    if ($session !== null) {
        $activeTenant = (string)($session['tenant_slug'] ?? '');
        $options = '';
        foreach ($organizations as $organization) {
            $slug = (string)($organization['slug'] ?? '');
            $selected = hash_equals($activeTenant, $slug) ? ' selected' : '';
            $options .= '<option value="' . $h($slug) . '"' . $selected . '>' . $h((string)($organization['name'] ?? $slug)) . '</option>';
        }
        $accountNavHtml = sprintf(
            '<div class="account-nav"><label>%s<select id="legal-organization-select">%s</select></label><a class="panel-return" href="/?action=panel&amp;lang=%s">%s</a></div>',
            $h((string)($dict['nav_active_organization'] ?? 'Organization')),
            $options,
            urlencode($locale),
            $h((string)($dict['nav_return_panel'] ?? 'Return to panel'))
        );
    }
    $switchFailedLabel = $h((string)($dict['nav_organization_switch_failed'] ?? 'Organization switch failed'));

    return Response::html(200, <<<HTML
<!DOCTYPE html>
<html lang="{$lang}">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{$title}</title>
    <style>
      :root {
        --font-family: 'Inter', 'Segoe UI', sans-serif;
        --bg-primary: #0F172A;
        --bg-surface: rgba(30, 41, 59, 0.72);
        --bg-card: rgba(30, 41, 59, 0.88);
        --border-color: rgba(255, 255, 255, 0.14);
        --text-primary: #F8FAFC;
        --text-secondary: #94A3B8;
        --text-muted: #64748B;
        --accent: #6366F1;
        --shadow: 0 20px 40px -30px rgba(0, 0, 0, 0.75);
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: var(--font-family);
        line-height: 1.6;
        background-color: var(--bg-primary);
        color: var(--text-primary);
      }
      a { color: #A5B4FC; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .container {
        max-width: 1024px;
        margin: 0 auto;
        padding: 1.2rem;
      }
      header, footer {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        padding: 1rem 1.2rem;
      }
      header { border-radius: 12px; margin: 1rem 0 1.5rem; }
      header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
      .account-nav { display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; flex-wrap: wrap; }
      .account-nav label { display: flex; align-items: center; gap: 0.45rem; color: var(--text-secondary); }
      .account-nav select, .panel-return { min-height: 40px; border: 1px solid var(--border-color); border-radius: 8px; padding: 0.45rem 0.7rem; color: var(--text-primary); background: var(--bg-card); }
      footer { margin: 1.5rem 0; border-radius: 12px; font-size: 0.9rem; }
      .hero {
        background: linear-gradient(140deg, var(--bg-card), transparent);
        border: 1px solid var(--border-color);
        border-radius: 12px;
        box-shadow: var(--shadow);
        padding: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .hero p { color: var(--text-secondary); margin-top: 0.5rem; }
      .legal-section {
        margin-top: 1.2rem;
        padding: 1rem 1.2rem;
        border: 1px solid var(--border-color);
        border-radius: 12px;
        background: var(--bg-surface);
      }
      .legal-section h2 {
        margin: 0 0 0.6rem;
        font-size: 1.08rem;
        font-weight: 600;
      }
      .legal-section ul {
        margin: 0.4rem 0 0;
        padding-left: 1.1rem;
        color: var(--text-secondary);
      }
      .legal-section p { color: var(--text-secondary); }
      .legal-section p:last-child { margin-bottom: 0; }
      .legal-cta {
        margin-top: 1.4rem;
        padding: 1rem;
        border-left: 4px solid var(--accent);
        border-radius: 10px;
        background: rgba(99, 102, 241, 0.12);
        color: #D7DAFE;
        font-size: 0.95rem;
      }
      .footer-links {
        display: flex;
        justify-content: space-between;
        gap: 0.8rem;
        align-items: center;
      }
    </style>
</head>
<body>
  <main class="container">
    <header>
      <strong>Subactor</strong>
      {$accountNavHtml}
    </header>
    <section class="hero">
      <h1>{$title}</h1>
      <p><strong>{$scopeLabel}</strong> {$scopeNotice}</p>
      <p>{$legalSub}</p>
      <p>{$partnerHint}</p>
    </section>

    <section class="legal-section">
      <h2>{$registrationTitle}</h2>
      {$registrationNoticeHtml}
    </section>

    {$sectionsHtml}
  </main>
  <footer class="container footer-links">
    <a href="{$homeUrl}">← {$backToHomeLabel}</a>
  </footer>
  <script>
    const organizationSelect = document.getElementById('legal-organization-select');
    organizationSelect?.addEventListener('change', async () => {
      organizationSelect.disabled = true;
      try {
        const response = await fetch('/api/organizations/switch', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({tenant_slug: organizationSelect.value})
        });
        if (!response.ok) throw new Error('organization_switch_failed');
        window.location.href = '/?action=panel&lang={$lang}';
      } catch {
        organizationSelect.disabled = false;
        window.alert('{$switchFailedLabel}');
      }
    });
  </script>
</body>
</html>
HTML);
});

// Favicon — fail-soft SVG icon
$router->get('/favicon.svg', function (Request $req) {
    $svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#1a1a2e"/><path d="M16 6 L26 26 L6 26 Z" fill="#e94560"/></svg>';
    return new Response(200, ['Content-Type' => 'image/svg+xml'], $svg);
});

$router->get('/favicon.ico', function (Request $req) {
    // Redirect to SVG favicon
    return new Response(302, ['Location' => '/favicon.svg'], '');
});

// Static assets from Vite build (cache/html/assets/)
$router->get('/assets/*', function (Request $req) {
    $assetFile = __DIR__ . '/cache/html' . parse_url($req->uri, PHP_URL_PATH);
    if (is_file($assetFile)) {
        $ext = pathinfo($assetFile, PATHINFO_EXTENSION);
        $mime = match($ext) {
            'js' => 'application/javascript',
            'css' => 'text/css',
            'svg' => 'image/svg+xml',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'woff2' => 'font/woff2',
            default => 'application/octet-stream',
        };
        return new Response(200, ['Content-Type' => $mime], file_get_contents($assetFile));
    }
    return Response::json(404, ['ok' => false, 'error' => 'asset_not_found']);
});

$localizeMetadata = static function (string $html, string $locale): string {
    $ui = I18n::ui($locale);
    $title = htmlspecialchars(
        (string)($ui['seo_title'] ?? 'Subactor'),
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );
    $description = htmlspecialchars(
        (string)($ui['seo_description'] ?? ''),
        ENT_QUOTES | ENT_SUBSTITUTE,
        'UTF-8'
    );

    $html = preg_replace_callback(
        '~<title\b[^>]*>.*?</title>~is',
        static fn(): string => "<title>{$title}</title>",
        $html,
        1
    ) ?? $html;

    return preg_replace_callback(
        '~<meta\b(?=[^>]*\bname=(["\'])description\1)[^>]*>~is',
        static fn(): string => '<meta name="description" content="' . $description . '" />',
        $html,
        1
    ) ?? $html;
};

$router->get('/', function (Request $req) use ($dslInterpreter, $sessionMgr, $connections, $hosting, $nodeRegistry, $eventStore, $config, $localizeMetadata, $enrichSession) {
    // Serve TypeScript SSR frontend from cache if available
    $cachedHtml = __DIR__ . '/cache/html/index.html';
    if (is_file($cachedHtml)) {
        $html = file_get_contents($cachedHtml);
        $interval = $req->query('interval') === 'year' ? 'year' : 'month';
        $session = $sessionMgr->fromCookieHeader($_SERVER['HTTP_COOKIE'] ?? null);
        if ($session !== null) $session = $enrichSession($session);
        $cookieHeader = $_SERVER['HTTP_COOKIE'] ?? null;
        $locale = PreferencesResolver::negotiate(
            $req->query('lang'),
            PreferencesResolver::storedLocale($cookieHeader),
            $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? null
        );
        $supportedCurrencies = array_keys($config->displayCurrencyRates);
        $requestedCurrency = strtoupper((string)$req->query('currency'));
        $initialCurrency = in_array($requestedCurrency, $supportedCurrencies, true)
            ? $requestedCurrency
            : ($locale === 'pl' ? 'PLN' : 'EUR');
        $integrations = $dslInterpreter->execute(['command' => 'LIST_INTEGRATIONS', 'payload' => ['locale' => $locale]]);
        $nodes = $session
            ? NodeMarketplace::forTenant((string)($session['tenant_slug'] ?? ''), $locale)
            : ['meta' => [], 'nodes' => []];
        $propsJson = json_encode([
            'initialPlans' => array_map(
                static fn(array $plan): array => I18n::translatePlan($plan, $locale),
                array_values(Plans::offered($interval))
            ),
            'initialIntegrations' => $integrations['result']['integrations'] ?? [],
            'initialIntegrationsMeta' => $integrations['result']['meta'] ?? [],
            'initialMeta' => I18n::offerMeta(Plans::meta(), $locale),
            'locale' => $locale,
            'locales' => I18n::meta()['locales'] ?? ['pl'],
            'localeLabels' => I18n::meta()['labels'] ?? new stdClass(),
            'initialCurrency' => $initialCurrency,
            'currencyRates' => $config->displayCurrencyRates,
            'currencyRatesAsOf' => $config->displayCurrencyRatesAsOf,
            't' => I18n::ui($locale),
            'identityProviders' => IdentityProviders::offered(includeDevOnly: $config->environment === 'development'),
            'session' => $session,
            'initialConnections' => $session ? $connections->forTenant($session['tenant_slug'] ?? '') : (object)[],
            'initialHosting' => $session ? $hosting->stateFor($session['tenant_slug'] ?? '') : null,
            'initialEvents' => $session ? $eventStore->recentFor($session['tenant_slug'] ?? '', 12) : [],
            'initialNodes' => $nodes['nodes'],
            'initialNodesMeta' => $nodes['meta'],
            'initialEnrolledNodes' => $session ? $nodeRegistry->forTenant((string)($session['tenant_slug'] ?? '')) : [],
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
        $openWebUiUrl = TenantHosting::resolveOpenWebUiUrl(
            $session ? $hosting->stateFor($session['tenant_slug'] ?? '') : null
        );
        $openWebUiJson = json_encode(
            $openWebUiUrl,
            JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
        );
        $inject = "<script>window.__SUBACTOR_OPENWEBUI_URL__={$openWebUiJson};window.__INITIAL_PROPS__={$propsJson};</script>";
        $html = str_replace('</body>', $inject . '</body>', $html);
        $html = preg_replace('/<html lang="[a-z-]+"/', '<html lang="' . $locale . '"', $html, 1) ?? $html;
        $html = $localizeMetadata($html, $locale);
        return Response::html(200, $html)->withHeader('Set-Cookie', PreferencesResolver::cookie($locale));
    }

    // Fallback: legacy PHP heredoc rendering
    $langParam = $req->query('lang');
    $pref = PreferencesResolver::resolve($langParam);
    $refCode = $req->query('ref');
    $promoCode = $req->query('promo');
    $planParam = $req->query('plan');
    $actionParam = $req->query('action');

    $refInfo = ReflinkManager::parseReflink($refCode);
    $promoInfo = $promoCode ? PromoEngine::validate($promoCode) : null;

    // SVG inline icons (replace all emoji)
    $svgParty = '<svg class="icon-svg icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"/><path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.63-.69 1.08-1.36.97c-.43-.07-.83-.37-.98-.8L16 12"/><path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98c-.63.11-1.08.69-.97 1.36c.07.43.37.83.8.98L12 8"/><path d="m11 13 1.33-1.33c.48-.48.48-1.26 0-1.73l-2.4-2.39c-.32-.32-.73-.46-1.13-.38l-2.21.44"/></svg>';
    $svgRocket = '<svg class="icon-svg icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>';
    $svgKey = '<svg class="icon-svg icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>';
    $svgHandshake = '<svg class="icon-svg icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/></svg>';

    $badge = '';
    $showRegisterForm = ($actionParam === 'register');
    $showLoginForm = ($actionParam === 'login');
    $showContactForm = ($actionParam === 'contact');
    $selectedPlan = $planParam ?: '';
    $selectedPromo = $promoCode ?: '';

    if ($promoInfo && $promoInfo['discount_percent'] === 100) {
        $badge = "<div class=\"badge badge-success\">{$svgParty} Aktywowano kod <strong>{$promoInfo['code']}</strong> — Dostęp 0 EUR (NOCC - Bez karty płatniczej)!</div>";
    } elseif ($planParam && $showRegisterForm) {
        $planName = htmlspecialchars($planParam);
        $badge = "<div class=\"badge badge-success\">{$svgRocket} Rejestracja konta w planie: <strong>{$planName}</strong> — Uzupełnij formularz poniżej</div>";
    } elseif ($showLoginForm) {
        $badge = "<div class=\"badge badge-info\">{$svgKey} Logowanie do Subactor POA Engine — Wprowadź dane dostępowe</div>";
    } elseif ($refInfo) {
        $badge = "<div class=\"badge badge-info\">{$svgHandshake} Rejestracja z polecenia partnera: <strong>{$refInfo['ref_code']}</strong></div>";
    }

    $plSel = $pref['locale'] === 'pl' ? 'selected' : '';
    $enSel = $pref['locale'] === 'en' ? 'selected' : '';
    $deSel = $pref['locale'] === 'de' ? 'selected' : '';
    $localeStr = $pref['locale'];

    // Offer grid — built from config/plans.json so this no-build fallback and the
    // TypeScript frontend always advertise the same subscriptions, add-on and licence.
    $svgCheck = '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    $svgTwin = '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"/><path d="M4 21a8 8 0 0 1 16 0"/><path d="M18 4h3v3"/><path d="m21 4-4 4"/></svg>';
    $svgAction = '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>';

    $offeredPlans = Plans::offered('month');
    $offerMeta = Plans::meta();
    $fmtMinor = static function (int $minor, string $currency): string {
        $amount = number_format($minor / 100, 2, ',', ' ');
        return match (strtoupper($currency)) {
            'PLN' => $amount . ' zł',
            'EUR' => $amount . ' €',
            default => $amount . ' ' . strtoupper($currency),
        };
    };

    $pricingCards = '';
    $priceMap = ['month' => [], 'year' => []];
    $planOrder = [];

    foreach ($offeredPlans as $planId => $p) {
        $planOrder[] = $planId;
        $unit = (string)($p['unit'] ?? '');
        $perpetual = in_array($unit, ['self_hosted', 'licencja'], true);
        $prepaid = $unit === 'actions_prepaid';
        $twinLabel = $perpetual
            ? 'Według zasobów własnej infrastruktury'
            : ($prepaid
                ? 'Nie dodaje aktywnego bliźniaka'
                : ((int)($p['active_twins_included'] ?? 1)) . ' aktywny cyfrowy bliźniak');
        $actions = number_format((int)($p['actions_included'] ?? 0), 0, ',', ' ');
        $actionLabel = $perpetual
            ? 'Akcje poza pakietami Cloud'
            : ($prepaid
                ? '+' . $actions . ' akcji, ważne ' . ((int)($p['actions_validity_months'] ?? 12)) . ' miesięcy'
                : $actions . ' zweryfikowanych akcji / miesiąc');
        $currency = (string)($p['currency'] ?? $offerMeta['currency'] ?? 'EUR');

        foreach (['month' => 'amount_monthly_minor', 'year' => 'amount_annual_minor'] as $iv => $field) {
            $noteKey = $iv === 'year' ? 'billing_note_annual' : 'billing_note_monthly';
            $periodKey = $iv === 'year' ? 'price_period_annual' : 'price_period_monthly';
            $priceMap[$iv][$planId] = [
                'price' => $fmtMinor((int)($p[$field] ?? 0), $currency),
                'period' => $p[$periodKey] ?? ($iv === 'year' ? '/ rok' : '/ msc'),
                'note' => $p[$noteKey] ?? '',
            ];
        }

        $features = '';
        foreach (($p['features'] ?? []) as $feature) {
            $features .= '<li>' . $svgCheck . ' ' . htmlspecialchars($feature) . '</li>';
        }

        $isFeatured = !empty($p['featured']);
        $tagStyle = $isFeatured ? '' : ' style="background: linear-gradient(135deg, #8B5CF6, #6D28D9);"';
        $tag = !empty($p['badge'])
            ? '<div class="card-tag"' . $tagStyle . '>' . htmlspecialchars($p['badge']) . '</div>'
            : '';
        $btnClass = $isFeatured ? 'btn-primary' : 'btn-secondary';

        $pricingCards .= sprintf(
            '<div class="card%s" data-plan="%s">%s<div>' .
            '<div class="card-tagline">%s</div>' .
            '<div class="card-title">%s</div>' .
            '<div class="card-tagline">%s</div>' .
            '<div class="card-price"><span class="price-val">%s</span> <span class="price-period">%s</span></div>' .
            '<div class="price-savings">%s</div>' .
            '<div class="card-tagline">%s %s</div>' .
            '<div class="card-tagline">%s %s</div>' .
            '<ul class="card-features">%s</ul>' .
            '</div><button class="%s" onclick="selectPlan(\'%s\')">%s</button></div>',
            $isFeatured ? ' card-featured' : '',
            htmlspecialchars($planId),
            $tag,
            htmlspecialchars($p['audience'] ?? ''),
            htmlspecialchars($p['name'] ?? $planId),
            htmlspecialchars($p['tagline'] ?? ''),
            $priceMap['month'][$planId]['price'],
            htmlspecialchars($priceMap['month'][$planId]['period']),
            htmlspecialchars($priceMap['month'][$planId]['note']),
            $svgTwin,
            htmlspecialchars($twinLabel),
            $svgAction,
            htmlspecialchars($actionLabel),
            $features,
            $btnClass,
            htmlspecialchars($planId),
            htmlspecialchars($p['cta'] ?? 'Wybierz plan')
        );
        unset($perpetual, $prepaid);
    }

    $pricesJson = json_encode($priceMap, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $planOrderJson = json_encode($planOrder, JSON_UNESCAPED_UNICODE);
    $offerDisclosure = htmlspecialchars(
        ($offerMeta['annual_rule'] ?? '') . ' ' . ($offerMeta['vat_note'] ?? '')
    );
    $defaultPlanId = $planOrder[0] ?? Plans::PLAN_DEFAULT;

    $html = <<<HTML
<!DOCTYPE html>
<html lang="{$localeStr}" data-theme="auto">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subactor SaaS Portal — Cennik, Pakiety i Panel Operacyjny</title>
    <meta name="description" content="">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
            --bg-primary: #0F172A;
            --bg-surface: rgba(30, 41, 59, 0.7);
            --bg-card: rgba(30, 41, 59, 0.85);
            --border-color: rgba(255, 255, 255, 0.1);
            --text-primary: #F8FAFC;
            --text-secondary: #94A3B8;
            --accent-primary: #6366F1;
            --accent-hover: #4F46E5;
            --accent-gradient: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
            --success-color: #10B981;
            --info-color: #3B82F6;
            --shadow-glow: 0 0 25px rgba(99, 102, 241, 0.25);
            --card-radius: 16px;
        }

        [data-theme="light"] {
            --bg-primary: #F8FAFC;
            --bg-surface: rgba(255, 255, 255, 0.8);
            --bg-card: #FFFFFF;
            --border-color: rgba(0, 0, 0, 0.08);
            --text-primary: #0F172A;
            --text-secondary: #64748B;
            --shadow-glow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: var(--font-family);
            background-color: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            transition: background-color 0.3s ease, color 0.3s ease;
            min-height: 100vh;
        }

        .icon-svg { display: inline-block; width: 1em; height: 1em; vertical-align: -0.125em; fill: currentColor; flex-shrink: 0; }
        .icon-svg.icon-lg { width: 1.4em; height: 1.4em; }
        .icon-svg.icon-xl { width: 3rem; height: 3rem; }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
        }

        /* Header Navigation */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem 0;
            border-bottom: 1px solid var(--border-color);
            backdrop-filter: blur(12px);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .brand {
            font-size: 1.4rem;
            font-weight: 700;
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .nav-controls {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .btn-toggle {
            background: var(--bg-surface);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 0.5rem 0.85rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.4rem;
        }
        .btn-toggle:hover {
            border-color: var(--accent-primary);
            transform: translateY(-1px);
        }

        /* Badges */
        .badge {
            padding: 0.85rem 1.25rem;
            border-radius: 10px;
            margin: 1.5rem 0;
            font-weight: 500;
            animation: fadeIn 0.4s ease-out;
        }
        .badge-success { background: rgba(16, 185, 129, 0.15); border: 1px solid var(--success-color); color: #34D399; }
        .badge-info { background: rgba(59, 130, 246, 0.15); border: 1px solid var(--info-color); color: #60A5FA; }

        /* Hero & Billing Toggle */
        .hero {
            text-align: center;
            padding: 3rem 1rem 2rem 1rem;
        }
        .hero h1 {
            font-size: clamp(2rem, 5vw, 3.2rem);
            font-weight: 800;
            margin-bottom: 0.75rem;
            line-height: 1.15;
        }
        .hero p {
            font-size: clamp(1rem, 2.5vw, 1.2rem);
            color: var(--text-secondary);
            max-width: 720px;
            margin: 0 auto 2rem auto;
        }

        .billing-toggle-container {
            display: inline-flex;
            align-items: center;
            background: var(--bg-surface);
            padding: 0.35rem;
            border-radius: 40px;
            border: 1px solid var(--border-color);
            margin-bottom: 2.5rem;
            gap: 0.5rem;
        }
        .billing-btn {
            padding: 0.6rem 1.4rem;
            border-radius: 30px;
            border: none;
            background: transparent;
            color: var(--text-secondary);
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.25s ease;
        }
        .billing-btn.active {
            background: var(--accent-gradient);
            color: white;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
        }
        .discount-pill {
            background: rgba(16, 185, 129, 0.2);
            color: var(--success-color);
            padding: 0.2rem 0.6rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 700;
            margin-left: 0.3rem;
        }

        /* Inline Notice Banner */
        .inline-notice-banner {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
            padding: 0.85rem 1.5rem;
            background: rgba(99, 102, 241, 0.15);
            border: 1px solid var(--accent-primary);
            color: var(--text-primary);
            border-radius: 14px;
            margin: 0 auto 2rem auto;
            max-width: 620px;
            font-weight: 600;
            font-size: 1rem;
            box-shadow: 0 4px 20px rgba(99, 102, 241, 0.25);
            backdrop-filter: blur(10px);
            animation: fadeInNotice 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes fadeInNotice {
            from { opacity: 0; transform: translateY(-10px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Pricing Cards Grid */
        .offer-disclosure {
            font-size: 0.85rem;
            color: var(--text-secondary);
            text-align: center;
            margin-top: 1.25rem;
        }

        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
            gap: 1.75rem;
            margin: 1.5rem 0 4rem 0;
        }
        .card {
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--card-radius);
            padding: 2.25rem 1.75rem;
            position: relative;
            box-shadow: var(--shadow-glow);
            transition: transform 0.3s ease, border-color 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: left;
        }
        .card:hover {
            transform: translateY(-5px);
            border-color: var(--accent-primary);
        }
        .card-featured {
            border: 2px solid var(--accent-primary);
        }
        .card-tag {
            position: absolute;
            top: -12px;
            right: 20px;
            background: var(--accent-gradient);
            color: white;
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem;
            font-weight: 700;
            border-radius: 20px;
            text-transform: uppercase;
        }
        .card-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.3rem; }
        .card-tagline { font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 1.25rem; min-height: 2.5rem; }
        .card-price { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.2rem; display: flex; align-items: baseline; gap: 0.4rem; }
        .card-price span { font-size: 1rem; font-weight: 400; color: var(--text-secondary); }
        .price-savings { font-size: 0.85rem; font-weight: 500; color: var(--text-secondary); min-height: 1.4rem; margin-bottom: 1.25rem; transition: all 0.25s ease; }
        .price-savings .savings-highlight { color: var(--success-color); font-weight: 700; }
        .card-features { list-style: none; margin: 1.25rem 0 2rem 0; text-align: left; }
        .card-features li { margin-bottom: 0.75rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; }
        .card-features li::before { content: ""; display: inline-block; width: 1em; height: 1em; background: var(--success-color); -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E") center/contain no-repeat; mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E") center/contain no-repeat; }

        .btn-primary {
            width: 100%;
            padding: 0.85rem;
            border-radius: 10px;
            border: none;
            background: var(--accent-gradient);
            color: white;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: opacity 0.2s ease;
        }
        .btn-secondary {
            width: 100%;
            padding: 0.85rem;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            background: var(--bg-surface);
            color: var(--text-primary);
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .btn-secondary:hover { border-color: var(--accent-primary); color: var(--accent-primary); }

        /* Blurred Dashboard Teaser Section */
        .dashboard-preview-section {
            margin-top: 3rem;
            position: relative;
            border-radius: var(--card-radius);
            overflow: hidden;
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow-glow);
            background: var(--bg-card);
        }

        .dashboard-preview-content {
            padding: 2.5rem;
            filter: blur(3px);
            opacity: 0.65;
            user-select: none;
            pointer-events: none;
            transition: all 0.4s ease;
        }

        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-color);
        }

        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .metric-card {
            background: var(--bg-surface);
            padding: 1.5rem;
            border-radius: 12px;
            border: 1px solid var(--border-color);
        }
        .metric-title { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .metric-value { font-size: 1.8rem; font-weight: 800; color: var(--text-primary); }
        .metric-change { font-size: 0.8rem; color: var(--success-color); font-weight: 600; margin-top: 0.2rem; }

        .dashboard-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1.5rem;
        }
        .dashboard-table th, .dashboard-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid var(--border-color);
        }
        .dashboard-table th { color: var(--text-secondary); font-size: 0.875rem; font-weight: 600; }
        .dashboard-table td { font-size: 0.9rem; }

        .status-pill {
            display: inline-block;
            padding: 0.25rem 0.6rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 700;
        }
        .status-ok { background: rgba(16, 185, 129, 0.2); color: var(--success-color); }
        .status-proc { background: rgba(59, 130, 246, 0.2); color: var(--info-color); }

        /* Lock Overlay Banner */
        .dashboard-lock-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            background: rgba(15, 23, 42, 0.40);
            backdrop-filter: blur(2px);
            z-index: 10;
            text-align: center;
        }

        .lock-card {
            background: rgba(30, 41, 59, 0.92);
            border: 1px solid var(--accent-primary);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), var(--shadow-glow);
            padding: 2.5rem;
            border-radius: 20px;
            max-width: 580px;
            animation: fadeIn 0.5s ease-out;
        }
        .lock-icon { font-size: 3rem; margin-bottom: 1rem; display: inline-block; }
        .lock-title { font-size: 1.6rem; font-weight: 800; margin-bottom: 0.75rem; color: var(--text-primary); }
        .lock-desc { color: var(--text-secondary); font-size: 1rem; margin-bottom: 1.75rem; line-height: 1.5; }
        .lock-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .lock-btn-primary {
            padding: 0.85rem 1.75rem;
            border-radius: 10px;
            border: none;
            background: var(--accent-gradient);
            color: white;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
            transition: transform 0.2s ease;
        }
        .lock-btn-primary:hover { transform: translateY(-2px); }
        .lock-btn-secondary {
            padding: 0.85rem 1.75rem;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            background: var(--bg-surface);
            color: var(--text-primary);
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .lock-btn-secondary:hover { border-color: var(--accent-primary); }

        /* Auth Forms (Register / Login) */
        .auth-section {
            max-width: 520px;
            margin: 2rem auto 3rem auto;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--card-radius);
            padding: 2.5rem;
            box-shadow: var(--shadow-glow);
            animation: fadeIn 0.4s ease-out;
        }
        .auth-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 0.5rem; text-align: center; }
        .auth-subtitle { font-size: 0.95rem; color: var(--text-secondary); text-align: center; margin-bottom: 2rem; }
        .auth-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        .form-label { font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); }
        .form-input {
            padding: 0.75rem 1rem;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            background: var(--bg-primary);
            color: var(--text-primary);
            font-size: 1rem;
            font-family: var(--font-family);
            transition: border-color 0.2s ease;
        }
        .form-input:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15); }
        .form-input::placeholder { color: var(--text-secondary); opacity: 0.6; }
        .form-hint { font-size: 0.8rem; color: var(--text-secondary); }
        .form-result { padding: 1rem 1.25rem; border-radius: 10px; font-size: 0.9rem; display: none; }
        .form-result.success { background: rgba(16, 185, 129, 0.15); border: 1px solid var(--success-color); color: #34D399; }
        .form-result.error { background: rgba(239, 68, 68, 0.15); border: 1px solid #EF4444; color: #F87171; }
        .form-result pre { margin-top: 0.5rem; font-size: 0.8rem; white-space: pre-wrap; word-break: break-all; }

        /* Integrations Section */
        .integrations-section {
            margin: 3rem 0;
            padding: 2rem;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--card-radius);
            box-shadow: var(--shadow-glow);
        }
        .integrations-title { font-size: 1.4rem; font-weight: 700; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem; }
        .integrations-subtitle { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
        .integrations-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
        .integration-card {
            background: var(--bg-surface);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            transition: border-color 0.2s ease;
        }
        .integration-card:hover { border-color: var(--accent-primary); }
        .integration-name { font-size: 1rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; }
        .integration-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; }
        .integration-status { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.75rem; font-weight: 600; }
        .integration-status.available { color: var(--success-color); }
        .integration-status.coming { color: var(--text-secondary); }
        .integration-ports { font-size: 0.75rem; color: var(--text-secondary); font-family: monospace; }

        /* Footer */
        .footer {
            border-top: 1px solid var(--border-color);
            padding: 2rem 0;
            text-align: center;
            color: var(--text-secondary);
            font-size: 0.875rem;
            margin-top: 4rem;
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 640px) {
            .navbar { flex-direction: column; gap: 1rem; text-align: center; }
            .hero { padding: 2rem 0.5rem; }
            .pricing-grid { grid-template-columns: 1fr; }
            .lock-card { padding: 1.5rem; }
            .lock-actions { flex-direction: column; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="navbar">
            <div class="brand">
                <svg class="icon-svg icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                <span>Subactor SaaS</span>
            </div>
            <div class="nav-controls">
                <select id="langSelect" class="btn-toggle" onchange="changeLang(this.value)">
                    <option value="pl" {$plSel}>PL Polski</option>
                    <option value="en" {$enSel}>EN English</option>
                    <option value="de" {$deSel}>DE Deutsch</option>
                </select>
                <button class="btn-toggle" onclick="toggleTheme()" id="themeBtn"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg> Dark</button>
            </div>
        </header>

        {$badge}

        <main class="hero">
            <h1>Wybierz pakiet dla swojej organizacji</h1>
            <p>Elastyczne rozliczenia miesięczne oraz roczne z rabatem za 10 miesięcy (2 miesiące gratis).</p>

            <div class="billing-toggle-container">
                <button class="billing-btn active" id="btnMonthly" onclick="setBillingInterval('month')">Rozliczenie Miesięczne</button>
                <button class="billing-btn" id="btnAnnual" onclick="setBillingInterval('year')">
                    Rozliczenie Roczne <span class="discount-pill">2 msc GRATIS</span>
                </button>
            </div>

            <div id="inlineNotice" class="inline-notice-banner" style="display: none;">
                <svg class="icon-svg icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                <span id="inlineNoticeText"></span>
            </div>

            <div class="pricing-grid">
                {$pricingCards}
            </div>
            <p class="offer-disclosure">{$offerDisclosure}</p>

HTML;

    // Registration Form
    if ($showRegisterForm) {
        $planVal = htmlspecialchars($selectedPlan);
        $promoVal = htmlspecialchars($selectedPromo);
        $refVal = htmlspecialchars($refCode ?? '');
        $html .= <<<HTML
            <section class="auth-section" id="registerForm">
                <h2 class="auth-title">Rejestracja konta Subactor SaaS</h2>
                <p class="auth-subtitle">Uzupełnij e-mail, aby utworzyć konto w wybranym planie.</p>
                <form class="auth-form" id="registerFormEl" onsubmit="submitRegistration(event)">
                    <input type="hidden" name="plan" value="{$planVal}">
                    <input type="hidden" name="promo_code" value="{$promoVal}">
                    <input type="hidden" name="ref_code" value="{$refVal}">
                    <div class="form-group">
                        <label class="form-label" for="regEmail">E-mail</label>
                        <input type="email" class="form-input" id="regEmail" name="email" placeholder="admin@firma.pl" required>
                    </div>
                    <div class="form-group" id="promoGroup" style="display: none;">
                        <label class="form-label" for="regPromo">Kod promocyjny (NOCC)</label>
                        <input type="text" class="form-input" id="regPromo" name="promo_display" value="{$promoVal}" readonly>
                        <span class="form-hint">Kod aktywny — rejestracja bez karty płatniczej (0 EUR).</span>
                    </div>
                    <button type="submit" class="btn-primary">Załóż konto za 0 EUR</button>
                    <div class="form-result" id="regResult"></div>
                    <p class="form-switch">Masz już konto? <button type="button" class="link-button" onclick="location.href='/?action=login'">Zaloguj się</button></p>
                </form>
            </section>
HTML;
        if ($selectedPromo) {
            $html .= "<script>document.addEventListener('DOMContentLoaded',function(){document.getElementById('promoGroup').style.display='flex';});</script>\n";
        }
    }

    // Login Form
    if ($showLoginForm) {
        $html .= <<<HTML
            <section class="auth-section" id="loginForm">
                <h2 class="auth-title">Logowanie do panelu operacyjnego</h2>
                <p class="auth-subtitle" id="loginSubtitle">Podaj e-mail użyty przy rejestracji, aby otrzymać kod OTP.</p>
                <form class="auth-form" id="loginFormEl" onsubmit="submitLogin(event)">
                    <div class="form-group" id="loginEmailGroup">
                        <label class="form-label" for="loginEmail">E-mail</label>
                        <input type="email" class="form-input" id="loginEmail" name="email" placeholder="admin@firma.pl" required>
                    </div>
                    <div class="form-group" id="loginOtpGroup" style="display: none;">
                        <label class="form-label" for="loginOtp">Kod OTP z wiadomości e-mail</label>
                        <input type="text" class="form-input" id="loginOtp" name="otp_code" placeholder="000000" maxlength="10" autocomplete="one-time-code" inputmode="numeric">
                        <span class="form-hint" id="otpHint">Kod ważny przez 10 minut.</span>
                    </div>
                    <button type="submit" class="btn-primary" id="loginSubmitBtn">Wyślij kod OTP</button>
                    <div class="form-result" id="loginResult"></div>
                    <p class="form-switch">Nie masz jeszcze konta? <button type="button" class="link-button" onclick="location.href='/?action=register'">Załóż je za 0 EUR</button></p>
                </form>
            </section>
HTML;
    }

    // On-Premise Contact Form
    if ($showContactForm) {
        $html .= <<<HTML
            <section class="auth-section" id="contactForm">
                <h2 class="auth-title">Zapytanie o wdrożenie On-Premise</h2>
                <p class="auth-subtitle">Licencja wieczysta na własnej infrastrukturze. Oszacowanie akcji służy wyłącznie do dobrania zasobów instalacji.</p>
                <form class="auth-form" id="contactFormEl" onsubmit="submitContact(event)">
                    <input type="hidden" name="plan" value="on-premise">
                    <div class="form-group">
                        <label class="form-label" for="contactEmail">E-mail kontaktowy</label>
                        <input type="email" class="form-input" id="contactEmail" name="email" placeholder="admin@firma.pl" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contactOrg">Nazwa organizacji</label>
                        <input type="text" class="form-input" id="contactOrg" name="organization" placeholder="Firma PL Sp. z o.o." required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contactActions">Szacowana liczba zweryfikowanych akcji miesięcznie</label>
                        <input type="number" class="form-input" id="contactActions" name="estimated_actions_monthly" placeholder="10000" min="1" value="10000">
                        <span class="form-hint">Ta wartość nie tworzy automatycznego zamówienia ani opłaty.</span>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contactInfra">Preferowana infrastruktura</label>
                        <select class="form-input" id="contactInfra" name="infrastructure">
                            <option value="plesk">Plesk / VPS</option>
                            <option value="bare-metal">Bare Metal / własny serwer</option>
                            <option value="cloud">Cloud (AWS / GCP / Azure)</option>
                            <option value="hybrid">Hybrydowa</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contactNotes">Dodatkowe uwagi (opcjonalnie)</label>
                        <textarea class="form-input" id="contactNotes" name="notes" rows="3" placeholder="Integracje, wymagania SLA, deadline wdrożenia..."></textarea>
                    </div>
                    <button type="submit" class="btn-primary">Wyślij zapytanie</button>
                    <div class="form-result" id="contactResult"></div>
                </form>
            </section>
HTML;
    }

    // Integrations Section
    $html .= <<<HTML
            <section class="integrations-section">
                <h2 class="integrations-title">
                    <svg class="icon-svg icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                    Dostępne integracje i connectory
                </h2>
                <p class="integrations-subtitle">Platforma Subactor łączy się z infrastrukturą computing, storage, LLM i ERP przez standaryzowane connectory URI Process.</p>
                <div class="integrations-grid">
                    <div class="integration-card">
                        <div class="integration-name">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 9h6v6H9z"/></svg>
                            LLM Account Hub
                        </div>
                        <div class="integration-desc">Zarządzanie wieloma kontami LLM (Google, ChatGPT, Anthropic) z izolowanych kontenerów noVNC. Jeden e-mail = jeden kontener.</div>
                        <div class="integration-status available">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>
                            Dostępny
                        </div>
                        <div class="integration-ports">noVNC: :6081 (dev) :6082 (test) :6083 (softreck) :6084 (prototypowanie)</div>
                    </div>
                    <div class="integration-card">
                        <div class="integration-name">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                            LLM Account Inventory
                        </div>
                        <div class="integration-desc">Inwentaryzacja kont LLM, AI clients, cloud accounts i browser credential stores. CQRS/ES DSL z shell i web dashboard.</div>
                        <div class="integration-status available">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>
                            Dostępny
                        </div>
                        <div class="integration-ports">Python pkg 0.7.0 | URI Process connector | CQRS DSL shell</div>
                    </div>
                    <div class="integration-card">
                        <div class="integration-name">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                            Allegro Sync Engine
                        </div>
                        <div class="integration-desc">Synchronizacja inventory i zamówień Allegro z ERP. Event-driven CQRS z preflight validation.</div>
                        <div class="integration-status coming">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                            W przygotowaniu
                        </div>
                        <div class="integration-ports">Connector: urirun-connector-subactor | Event: InventoryPreflightValidated</div>
                    </div>
                    <div class="integration-card">
                        <div class="integration-name">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/></svg>
                            Subiekt ERP Connector
                        </div>
                        <div class="integration-desc">Integracja z Subiekt ERP — dispatching zamówień do magazynu, synchronizacja stanów.</div>
                        <div class="integration-status coming">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                            W przygotowaniu
                        </div>
                        <div class="integration-ports">Event: OrderDispatchedToWarehouse | POA CQRS</div>
                    </div>
                    <div class="integration-card">
                        <div class="integration-name">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                            Subactor Control (URI Process)
                        </div>
                        <div class="integration-desc">Centralny authority boundary dla wszystkich connectorów. Typed Hub API, capability binding, receipt verification.</div>
                        <div class="integration-status available">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>
                            Dostępny
                        </div>
                        <div class="integration-ports">Control: :8091 | Bridge + urirun-node | Bearer auth</div>
                    </div>
                    <div class="integration-card">
                        <div class="integration-name">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
                            PayPal Billing
                        </div>
                        <div class="integration-desc">Checkout PayPal dla planów płatnych. Order creation, capture, subscriptions, webhook verification.</div>
                        <div class="integration-status available">
                            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg>
                            Dostępny (Digital Twin)
                        </div>
                        <div class="integration-ports">Twin: :8793 | Node API: /api/billing/* | OAuth2 + webhook sig</div>
                    </div>
                </div>
            </section>
HTML;

    $html .= <<<HTML

            <!-- Blurred Dashboard Teaser Section -->
            <section class="dashboard-preview-section">
                <div class="dashboard-preview-content">
                    <div class="dashboard-header">
                        <h2><svg class="icon-svg icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg> Panel Operacyjny Subactor (Podgląd)</h2>
                        <span class="status-pill status-ok"><svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/></svg> Live Sync OK</span>
                    </div>

                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-title">Przetworzone zdarzenia dzisiaj</div>
                            <div class="metric-value">148 920</div>
                            <div class="metric-change"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg> +14.2% od wczoraj</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-title">Średni czas reakcji POA</div>
                            <div class="metric-value">2.8 ms</div>
                            <div class="metric-change"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg> Wysoka wydajność</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-title">Aktywne integracje Allegro / ERP</div>
                            <div class="metric-value">12 / 12</div>
                            <div class="metric-change"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Bez incydentów</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-title">Aktualna retencja logów</div>
                            <div class="metric-value">30 Dni</div>
                            <div class="metric-change"><svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Pełny audyt</div>
                        </div>
                    </div>

                    <h3>Dziennik Aktywności w Czasie Rzeczywistym</h3>
                    <table class="dashboard-table">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Moduł / Integracja</th>
                                <th>Zdarzenie CQRS</th>
                                <th>Czas wykonania</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2026-08-12 11:40:12</td>
                                <td>Allegro Sync Engine</td>
                                <td>InventoryPreflightValidated</td>
                                <td>1.4 ms</td>
                                <td><span class="status-pill status-ok">SUCCESS</span></td>
                            </tr>
                            <tr>
                                <td>2026-08-12 11:40:08</td>
                                <td>Subiekt ERP Connector</td>
                                <td>OrderDispatchedToWarehouse</td>
                                <td>3.1 ms</td>
                                <td><span class="status-pill status-ok">SUCCESS</span></td>
                            </tr>
                            <tr>
                                <td>2026-08-12 11:39:55</td>
                                <td>PromoEngine NOCC</td>
                                <td>TenantProvisionedWithPromo</td>
                                <td>0.9 ms</td>
                                <td><span class="status-pill status-proc">PROVISIONED</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Overlay Banner Lock -->
                <div class="dashboard-lock-overlay">
                    <div class="lock-card">
                        <span class="lock-icon"><svg class="icon-svg icon-xl" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></span>
                        <h2 class="lock-title">Pełny dostęp do Panelu Operacyjnego</h2>
                        <p class="lock-desc">
                            Załóż bezpłatne konto w planie pilotażowym za 1 EUR miesięcznie lub wykorzystaj kod promocyjny <strong>NOCC100</strong>, aby uzyskać natychmiastowy dostęp do monitoringu procesów w czasie rzeczywistym i automatyzacji integracji.
                        </p>
                        <div class="lock-actions">
                            <button class="lock-btn-primary" onclick="selectPlan('{$defaultPlanId}', 'NOCC100')">Rozpocznij Za 0 EUR (NOCC)</button>
                            <button class="lock-btn-secondary" onclick="handleLoginClick()">Zaloguj się</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <footer class="footer">
            <p>&copy; 2026 Subactor SaaS Platform. Plesk Modular Architecture (POA CQRS + ES Engine).</p>
            <p><a href="/legal">Informacje prawne UE</a> · <a href="/?action=contact">Kontakt przez formularz</a></p>
        </footer>
    </div>

    <script>
        let currentInterval = 'month';

        const prices = {$pricesJson};
        const planOrder = {$planOrderJson};

        function showInlineNotice(msg) {
            const noticeEl = document.getElementById('inlineNotice');
            const textEl = document.getElementById('inlineNoticeText');
            if (noticeEl && textEl) {
                textEl.innerText = msg;
                noticeEl.style.display = 'flex';
                noticeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        function setBillingInterval(interval) {
            currentInterval = interval;
            document.getElementById('btnMonthly').classList.toggle('active', interval === 'month');
            document.getElementById('btnAnnual').classList.toggle('active', interval === 'year');

            const priceVals = document.querySelectorAll('.price-val');
            const pricePeriods = document.querySelectorAll('.price-period');
            const priceSavings = document.querySelectorAll('.price-savings');

            planOrder.forEach((plan, idx) => {
                if (priceVals[idx]) priceVals[idx].innerText = prices[interval][plan].price;
                if (pricePeriods[idx]) pricePeriods[idx].innerText = prices[interval][plan].period;
                if (priceSavings[idx]) priceSavings[idx].innerText = prices[interval][plan].note;
            });
        }

        function currentLang() {
            const params = new URLSearchParams(window.location.search);
            return params.get('lang') || 'pl';
        }

        function buildUrl(params) {
            const base = new URL(window.location.origin + '/');
            const lang = currentLang();
            if (lang && lang !== 'pl') base.searchParams.set('lang', lang);
            for (const [k, v] of Object.entries(params)) {
                if (v != null) base.searchParams.set(k, v);
            }
            return base.toString();
        }

        function selectPlan(planId, promoCode) {
            if (planId === 'on-premise') {
                window.location.href = buildUrl({plan: 'on-premise', action: 'contact'});
            } else if (promoCode) {
                window.location.href = buildUrl({plan: planId, promo: promoCode, action: 'register'});
            } else {
                window.location.href = buildUrl({plan: planId, interval: currentInterval, action: 'register'});
            }
        }

        function handleLoginClick() {
            window.location.href = buildUrl({action: 'login'});
        }

        // Registration form submission — calls POST /api/access/request
        async function submitRegistration(event) {
            event.preventDefault();
            const form = event.target;
            const resultEl = document.getElementById('regResult');
            const formData = new FormData(form);
            const payload = {
                email: formData.get('email'),
                tenant_slug: formData.get('tenant_slug'),
                plan: formData.get('plan') || '{$defaultPlanId}',
                promo_code: formData.get('promo_code') || null,
                ref_code: formData.get('ref_code') || null,
                interval: currentInterval,
            };

            resultEl.style.display = 'block';
            resultEl.className = 'form-result';
            resultEl.innerHTML = 'Przetwarzanie rejestracji...';

            try {
                const resp = await fetch('/api/access/request', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                const data = await resp.json();

                if (data.ok) {
                    const isNocc = data.status === 'provisioned_nocc';
                    resultEl.className = 'form-result success';
                    let msg = '<strong>Konto utworzone!</strong><br>';
                    msg += 'Organizacja: ' + (data.aggregate_id || payload.tenant_slug) + '<br>';
                    msg += 'Status: ' + (isNocc ? 'Aktywowane (NOCC — bez karty)' : 'Oczekuje na płatność') + '<br>';
                    msg += 'Plan: ' + (data.plan?.id || payload.plan) + '<br>';
                    if (data.event_id) msg += 'Event ID: <code>' + data.event_id + '</code>';
                    resultEl.innerHTML = msg;
                } else {
                    resultEl.className = 'form-result error';
                    resultEl.innerHTML = '<strong>Błąd rejestracji:</strong> ' + (data.error || 'Nieznany błąd');
                }
            } catch (err) {
                resultEl.className = 'form-result error';
                resultEl.innerHTML = '<strong>Błąd połączenia:</strong> ' + err.message;
            }
        }

        // Login form submission — calls POST /api/access/login
        let otpStepActive = false;
        async function submitLogin(event) {
            event.preventDefault();
            const form = event.target;
            const resultEl = document.getElementById('loginResult');
            const formData = new FormData(form);
            const email = formData.get('email');
            const otpCode = formData.get('otp_code');
            const submitBtn = document.getElementById('loginSubmitBtn');
            const otpGroup = document.getElementById('loginOtpGroup');

            resultEl.style.display = 'block';
            resultEl.className = 'form-result';

            if (!otpStepActive && !otpCode) {
                resultEl.innerHTML = 'Generowanie i wysyłanie kodu OTP...';
                try {
                    const resp = await fetch('/api/access/request-otp', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: email }),
                    });
                    const data = await resp.json();
                    if (data.ok) {
                        otpStepActive = true;
                        otpGroup.style.display = 'flex';
                        submitBtn.innerText = 'Zaloguj się z OTP';
                        resultEl.className = 'form-result success';
                        let msg = (data.result && data.result.action === 'cooldown')
                            ? 'Odczekaj przed ponownym wysłaniem kodu OTP.'
                            : 'Kod OTP został wysłany na Twój e-mail.';
                        resultEl.innerHTML = msg;
                    } else {
                        resultEl.className = 'form-result error';
                        resultEl.innerHTML = '<strong>Błąd:</strong> ' + (data.error || 'Nieznany błąd');
                    }
                } catch (err) {
                    resultEl.className = 'form-result error';
                    resultEl.innerHTML = '<strong>Błąd połączenia:</strong> ' + err.message;
                }
                return;
            }

            resultEl.innerHTML = 'Weryfikacja kodu OTP...';
            try {
                const resp = await fetch('/api/access/verify-otp', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, otp_code: otpCode }),
                });
                const data = await resp.json();
                if (data.ok) {
                    resultEl.className = 'form-result success';
                    resultEl.innerHTML = '<strong>Zalogowano pomyślnie!</strong><br>Organizacja: ' + (data.session.tenant_slug || 'SaaS') + '<br>Przekierowanie do panelu...';
                    setTimeout(function() { window.location.href = buildUrl({action: 'dashboard'}); }, 1200);
                } else {
                    resultEl.className = 'form-result error';
                    resultEl.innerHTML = '<strong>Błąd logowania:</strong> ' + (data.error || 'Niepoprawny kod OTP');
                }
            } catch (err) {
                resultEl.className = 'form-result error';
                resultEl.innerHTML = '<strong>Błąd połączenia:</strong> ' + err.message;
            }
        }

        // On-Premise contact form submission — calls POST /api/access/request with on-premise plan
        async function submitContact(event) {
            event.preventDefault();
            const form = event.target;
            const resultEl = document.getElementById('contactResult');
            const formData = new FormData(form);

            resultEl.style.display = 'block';
            resultEl.className = 'form-result';
            resultEl.innerHTML = 'Wysyłanie zapytania...';

            const email = formData.get('email');
            const org = formData.get('organization');
            const tenantSlug = (org || 'on-premise').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').substring(0, 30) || 'on-premise-quote';

            try {
                const resp = await fetch('/api/access/request', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email,
                        tenant_slug: tenantSlug,
                        plan: 'on-premise',
                        interval: 'month',
                        notes: formData.get('notes') || '',
                        estimated_actions_monthly: formData.get('estimated_actions_monthly') || '10000',
                        infrastructure: formData.get('infrastructure') || 'plesk',
                        organization: org,
                    }),
                });
                const data = await resp.json();

                if (data.ok) {
                    resultEl.className = 'form-result success';
                    resultEl.innerHTML = '<strong>Zapytanie wysłane!</strong><br>Dziękujemy. Odezwiemy się z dedykowaną wyceną na adres <code>' + email + '</code> w ciągu 24h.<br>Event ID: <code>' + (data.event_id || 'N/A') + '</code>';
                } else {
                    resultEl.className = 'form-result error';
                    resultEl.innerHTML = '<strong>Błąd:</strong> ' + (data.error || 'Nieznany błąd');
                }
            } catch (err) {
                resultEl.className = 'form-result error';
                resultEl.innerHTML = '<strong>Błąd połączenia:</strong> ' + err.message;
            }
        }

        // Theme Toggle
        function getSystemTheme() {
            return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        function applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            const btn = document.getElementById('themeBtn');
            if (btn) btn.innerHTML = theme === 'dark' ? '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg> Dark' : '<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg> Light';
        }

        function toggleTheme() {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            localStorage.setItem('subactor_theme', next);
            applyTheme(next);
        }

        function changeLang(lang) {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            window.location.href = url.toString();
        }

        const savedTheme = localStorage.getItem('subactor_theme') || getSystemTheme();
        applyTheme(savedTheme);
    </script>
</body>
</html>
HTML;

    $html = $localizeMetadata($html, $localeStr);
    return Response::html(200, $html);
});

// Dispatch request to Router
$response = $router->dispatch(Request::capture());
$response->send();
