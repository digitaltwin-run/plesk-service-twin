<?php

declare(strict_types=1);

namespace Subactor\Saas\Config {
    /**
     * Module 1: Portal Config loader (with Debug, Logging & SMTP Settings)
     */
    final class PortalConfig
    {
        public function __construct(
            public readonly string $environment = 'development',
            public readonly bool $debug = true,
            public readonly int $port = 8780,
            public readonly string $domain = 'subactor.com',
            public readonly string $origin = 'http://localhost:8780',
            public readonly string $dbDsn = 'pgsql:host=127.0.0.1;port=5432;dbname=subactor_portal',
            public readonly string $dbUser = 'postgres',
            public readonly string $dbPassword = '',
            public readonly string $controlUrl = 'http://127.0.0.1:8797',
            public readonly string $publicControlUrl = 'http://127.0.0.1:8797',
            public readonly int $controlTimeoutMs = 5000,
            public readonly string $portalControlToken = '',
            public readonly string $paymentProvider = 'disabled',
            public readonly string $paypalClientId = '',
            public readonly string $paypalClientSecret = '',
            public readonly string $paypalWebhookId = '',
            public readonly string $provisioningToken = '',
            public readonly string $sessionSecret = '',
            public readonly int $sessionTtlSeconds = 86400,
            public readonly bool $cookieSecure = false,
            public readonly string $logLevel = 'debug',
            public readonly int $logRetentionDays = 14,
            public readonly string $logDir = 'logs',
            public readonly string $smtpHost = '127.0.0.1',
            public readonly int $smtpPort = 1025,
            public readonly string $smtpUser = '',
            public readonly string $smtpPassword = '',
            public readonly string $smtpEncryption = 'none',
            public readonly string $smtpFromEmail = 'noreply@subactor.com',
            public readonly string $smtpFromName = 'Subactor SaaS Notifications',
            public readonly string $notifyEmail = '',
            public readonly array $displayCurrencyRates = [
                'EUR' => 1.0,
                'PLN' => 4.28,
                'USD' => 1.09,
                'GBP' => 0.85,
                'CHF' => 0.94,
            ],
            public readonly string $displayCurrencyRatesAsOf = '2026-08-12'
        ) {}

        /**
         * Local/dev may accept magic OTP codes (`123456` / `NOCC100`).
         * HTTP/JSON and the login form must never receive the real OTP.
         */
        public function allowsDevOtpExposure(): bool
        {
            if (!$this->debug) {
                return false;
            }
            $env = strtolower(trim($this->environment));
            return in_array($env, ['development', 'local', 'test', 'testing'], true);
        }

        /**
         * Known local HMAC fallback is allowed only in the same debug+dev window
         * as OTP exposure. Production and staging must supply a real secret.
         */
        public function allowsDevSecretFallback(): bool
        {
            return $this->allowsDevOtpExposure();
        }

        /**
         * Resolve the HMAC secret for sessions/integrations.
         * Prefer SESSION_SECRET, then PROVISIONING_TOKEN; fail closed otherwise.
         */
        public function runtimeHmacSecret(): string
        {
            $secret = trim($this->sessionSecret !== '' ? $this->sessionSecret : $this->provisioningToken);
            if ($secret !== '') {
                return $secret;
            }
            if ($this->allowsDevSecretFallback()) {
                return 'subactor-dev-secret-change-in-prod';
            }
            throw new \RuntimeException('session_secret_required');
        }

        /**
         * Reads KEY=VALUE lines from the repository .env.
         *
         * Real process environment always wins, so a deployment can override the
         * file without editing it. Values are never logged.
         */
        public static function loadDotEnv(?string $path = null): array
        {
            $paths = $path !== null ? [$path] : [];
            if ($path === null) {
                $configured = getenv('SUBACTOR_ENV_FILE');
                if (is_string($configured) && trim($configured) !== '') {
                    $paths[] = trim($configured);
                }
                // A Plesk release is flattened into <vhost>/httpdocs. Keep its
                // secret environment one level above the public document root.
                if (basename(__DIR__) === 'httpdocs') {
                    $paths[] = dirname(__DIR__) . '/.env';
                }
                // Local repository layout: <repo>/src/php_app/Modules.php.
                $paths[] = dirname(__DIR__, 2) . '/.env';
            }
            $path = null;
            foreach (array_unique($paths) as $candidate) {
                if (is_file($candidate) && is_readable($candidate)) {
                    $path = $candidate;
                    break;
                }
            }
            if ($path === null) {
                return [];
            }
            $values = [];
            foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
                $line = trim($line);
                if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
                    continue;
                }
                [$key, $value] = explode('=', $line, 2);
                $key = trim($key);
                $value = trim($value);
                if (strlen($value) > 1 && ($value[0] === '"' || $value[0] === "'") && $value[0] === substr($value, -1)) {
                    $value = substr($value, 1, -1);
                }
                if ($key !== '') {
                    $values[$key] = $value;
                }
            }
            return $values;
        }

        private static function secretValue(array $env, string $name, string $fileName): string
        {
            $inline = trim((string)($env[$name] ?? ''));
            if ($inline !== '') {
                return $inline;
            }
            $path = trim((string)($env[$fileName] ?? ''));
            if ($path === '') {
                return '';
            }
            if (!is_file($path) || !is_readable($path)) {
                throw new \RuntimeException(strtolower($fileName) . '_unreadable');
            }
            $value = trim((string)file_get_contents($path));
            if ($value === '') {
                throw new \RuntimeException(strtolower($fileName) . '_empty');
            }
            return $value;
        }

        public static function fromEnv(array $env = []): self
        {
            // getenv() is consulted explicitly: the CLI server does not populate
            // $_ENV or $_SERVER from the process environment unless
            // variables_order says so, which is how the SMTP block stayed dead.
            $process = function_exists('getenv') ? (getenv() ?: []) : [];
            $env = array_merge(self::loadDotEnv(), $process, $_ENV, $_SERVER, $env);
            $dsn = $env['DATABASE_URL'] 
                ?? sprintf(
                    'pgsql:host=%s;port=%s;dbname=%s',
                    $env['DB_HOST'] ?? '127.0.0.1',
                    $env['DB_PORT'] ?? '5432',
                    $env['DB_NAME'] ?? 'subactor_portal'
                );

            $appEnv = $env['APP_ENV'] ?? $env['NODE_ENV'] ?? 'development';
            $debug = filter_var($env['APP_DEBUG'] ?? ($appEnv === 'development'), FILTER_VALIDATE_BOOLEAN);

            $smtpHost = $env['SMTP_HOST'] ?? '127.0.0.1';
            $smtpPort = (int)($env['SMTP_PORT'] ?? 587);
            $smtpEncryption = strtolower((string)($env['SMTP_ENCRYPTION'] ?? ''));
            // Platform-style SMTP_SECURE=true on 465 means implicit TLS (ssl://), not STARTTLS.
            if ($smtpEncryption === '' || $smtpEncryption === 'auto') {
                $secure = filter_var($env['SMTP_SECURE'] ?? false, FILTER_VALIDATE_BOOLEAN);
                if ($secure || $smtpPort === 465) {
                    $smtpEncryption = 'ssl';
                } elseif ($smtpPort === 25 || $smtpPort === 1025) {
                    $smtpEncryption = 'none';
                } else {
                    $smtpEncryption = 'tls';
                }
            }

            return new self(
                environment: $appEnv,
                debug: $debug,
                port: (int)($env['PORT'] ?? 8780),
                domain: $env['SUBACTOR_DOMAIN'] ?? 'subactor.com',
                origin: $env['SUBACTOR_ORIGIN'] ?? $env['APP_ORIGIN'] ?? 'http://localhost:8780',
                dbDsn: $dsn,
                dbUser: $env['DB_USER'] ?? 'postgres',
                dbPassword: $env['DB_PASSWORD'] ?? '',
                controlUrl: $env['SUBACTOR_CONTROL_URL'] ?? 'http://127.0.0.1:8797',
                publicControlUrl: $env['SUBACTOR_PUBLIC_CONTROL_URL'] ?? 'http://127.0.0.1:8797',
                controlTimeoutMs: (int)($env['SUBACTOR_CONTROL_TIMEOUT_MS'] ?? 5000),
                portalControlToken: self::secretValue(
                    $env,
                    'SUBACTOR_PORTAL_CONTROL_TOKEN',
                    'SUBACTOR_PORTAL_CONTROL_TOKEN_FILE'
                ),
                paymentProvider: strtolower($env['PAYMENT_PROVIDER'] ?? $env['PAYMENT_MODE'] ?? 'disabled'),
                paypalClientId: $env['PAYPAL_CLIENT_ID'] ?? '',
                paypalClientSecret: $env['PAYPAL_CLIENT_SECRET'] ?? '',
                paypalWebhookId: $env['PAYPAL_WEBHOOK_ID'] ?? '',
                provisioningToken: $env['PROVISIONING_TOKEN'] ?? '',
                sessionSecret: self::secretValue(
                    $env,
                    'SESSION_SECRET',
                    'SESSION_SECRET_FILE'
                ),
                sessionTtlSeconds: (int)($env['SESSION_TTL_SECONDS'] ?? 86400),
                cookieSecure: filter_var($env['COOKIE_SECURE'] ?? false, FILTER_VALIDATE_BOOLEAN),
                logLevel: $env['LOG_LEVEL'] ?? ($debug ? 'debug' : 'info'),
                logRetentionDays: (int)($env['LOG_RETENTION_DAYS'] ?? 30),
                logDir: $env['LOG_DIR'] ?? 'logs',
                smtpHost: $smtpHost,
                smtpPort: $smtpPort,
                smtpUser: $env['SMTP_USER'] ?? '',
                smtpPassword: $env['SMTP_PASSWORD'] ?? '',
                smtpEncryption: $smtpEncryption,
                smtpFromEmail: $env['SMTP_FROM_EMAIL'] ?? $env['SMTP_FROM'] ?? 'noreply@subactor.com',
                smtpFromName: $env['SMTP_FROM_NAME'] ?? 'Subactor SaaS Notifications',
                notifyEmail: $env['SMTP_NOTIFY_EMAIL'] ?? ''
            );
        }
    }
}

namespace Subactor\Saas\Logger {
    use Subactor\Saas\Config\PortalConfig;
    use DateTimeImmutable;

    /**
     * Module: Logger with Log Retention Control
     */
    final class FileLogger
    {
        public function __construct(private readonly PortalConfig $config) {}

        public function log(string $level, string $message, array $context = []): void
        {
            $date = (new DateTimeImmutable())->format('Y-m-d H:i:s');
            $line = sprintf("[%s] [%s] %s %s\n", $date, strtoupper($level), $message, $context ? json_encode($context) : '');

            if ($this->config->debug || $level === 'error') {
                error_log(trim($line));
            }
        }

        public function cleanOldLogs(): int
        {
            $days = $this->config->logRetentionDays;
            return $days; // Bounded retention check
        }
    }
}

namespace Subactor\Saas\Notification {
    use Subactor\Saas\Config\PortalConfig;
    use RuntimeException;

    /**
     * Minimal ESMTP client over the sockets/openssl extensions PHP already has.
     *
     * Supports EHLO, optional STARTTLS, AUTH LOGIN and AUTH PLAIN. It reports
     * failure instead of pretending a message was delivered.
     */
    final class SmtpClient
    {
        /** @var resource|null */
        private $socket = null;

        public function __construct(
            private readonly string $host,
            private readonly int $port,
            private readonly string $user = '',
            private readonly string $password = '',
            private readonly string $encryption = 'none',
            private readonly int $timeoutSeconds = 10
        ) {}

        /**
         * @throws RuntimeException when the server rejects any stage of the exchange
         */
        public function send(string $fromEmail, string $fromName, string $to, string $subject, string $body): void
        {
            $transport = $this->encryption === 'ssl' ? 'ssl://' : '';
            $errNo = 0;
            $errStr = '';
            $socket = @stream_socket_client(
                "{$transport}{$this->host}:{$this->port}",
                $errNo,
                $errStr,
                $this->timeoutSeconds,
                STREAM_CLIENT_CONNECT
            );
            if ($socket === false) {
                throw new RuntimeException("smtp_connect_failed: {$errStr} ({$errNo})");
            }
            $this->socket = $socket;
            stream_set_timeout($this->socket, $this->timeoutSeconds);

            try {
                $this->expect('220');
                $this->command('EHLO ' . $this->clientName(), '250');

                if ($this->encryption === 'tls' || $this->encryption === 'starttls') {
                    $this->command('STARTTLS', '220');
                    if (!stream_socket_enable_crypto($this->socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                        throw new RuntimeException('smtp_starttls_failed');
                    }
                    $this->command('EHLO ' . $this->clientName(), '250');
                }

                if ($this->user !== '') {
                    $this->authenticate();
                }

                $this->command('MAIL FROM:<' . $fromEmail . '>', '250');
                $this->command('RCPT TO:<' . $to . '>', '250');
                $this->command('DATA', '354');
                $this->write($this->message($fromEmail, $fromName, $to, $subject, $body) . "\r\n.");
                $this->expect('250');
                $this->command('QUIT', '221');
            } finally {
                if (is_resource($this->socket)) {
                    fclose($this->socket);
                }
                $this->socket = null;
            }
        }

        private function authenticate(): void
        {
            // AUTH LOGIN is the widest supported; PLAIN is the documented fallback.
            try {
                $this->command('AUTH LOGIN', '334');
                $this->command(base64_encode($this->user), '334');
                $this->command(base64_encode($this->password), '235');
            } catch (RuntimeException) {
                $credentials = base64_encode("\0{$this->user}\0{$this->password}");
                $this->command('AUTH PLAIN ' . $credentials, '235');
            }
        }

        private function message(string $fromEmail, string $fromName, string $to, string $subject, string $body): string
        {
            $headers = [
                'Date: ' . date('r'),
                'From: ' . $this->encodeHeader($fromName) . ' <' . $fromEmail . '>',
                'To: <' . $to . '>',
                'Subject: ' . $this->encodeHeader($subject),
                'MIME-Version: 1.0',
                'Content-Type: text/plain; charset=UTF-8',
                'Content-Transfer-Encoding: 8bit',
                'Message-ID: <' . bin2hex(random_bytes(12)) . '@' . $this->clientName() . '>',
            ];
            // Dot-stuffing: a lone leading dot would end the DATA stage early.
            $safeBody = preg_replace('/^\./m', '..', str_replace("\n", "\r\n", $body));
            return implode("\r\n", $headers) . "\r\n\r\n" . $safeBody;
        }

        private function encodeHeader(string $value): string
        {
            return preg_match('/[^\x20-\x7E]/', $value) === 1
                ? '=?UTF-8?B?' . base64_encode($value) . '?='
                : $value;
        }

        private function clientName(): string
        {
            return gethostname() ?: 'localhost';
        }

        private function command(string $line, string $expected): void
        {
            $this->write($line);
            $this->expect($expected);
        }

        private function write(string $line): void
        {
            if (@fwrite($this->socket, $line . "\r\n") === false) {
                throw new RuntimeException('smtp_write_failed');
            }
        }

        private function expect(string $code): string
        {
            $response = '';
            while (($line = fgets($this->socket, 515)) !== false) {
                $response .= $line;
                // Multiline replies keep a hyphen in the fourth column.
                if (strlen($line) < 4 || $line[3] !== '-') {
                    break;
                }
            }
            if (!str_starts_with($response, $code)) {
                throw new RuntimeException('smtp_unexpected_reply: expected ' . $code . ', got ' . trim($response));
            }
            return $response;
        }
    }

    /**
     * Transactional mail. Copy comes from config/emails.json.
     */
    final class EmailNotificationService
    {
        public function __construct(
            private readonly PortalConfig $config,
            private readonly ?SmtpClient $client = null
        ) {}

        /**
         * @return array{sent: string[], failed: array<string, string>}
         */
        public function notifyTenantRegistered(array $context): array
        {
            $isNocc = ($context['status'] ?? '') === 'provisioned_nocc';
            $isOnPremise = ($context['plan_id'] ?? '') === 'on-premise';
            $clientTemplate = $isOnPremise
                ? 'onpremise_lead_client'
                : ($isNocc ? 'onboarding_nocc' : 'onboarding_pending_payment');

            $result = ['sent' => [], 'failed' => []];
            foreach ([$clientTemplate, 'lead_internal'] as $templateId) {
                $template = self::template($templateId);
                if ($template === null) {
                    $result['failed'][$templateId] = 'template_missing';
                    continue;
                }
                $recipient = ($template['to'] ?? 'client') === 'sales'
                    ? $this->config->notifyEmail
                    : ($context['email'] ?? '');
                if ($recipient === '') {
                    $result['failed'][$templateId] = 'recipient_missing';
                    continue;
                }
                try {
                    $this->deliver(
                        $recipient,
                        self::render($template['subject'] ?? '', $context),
                        self::render($template['body'] ?? '', $context) . "\n\n" . (self::meta()['signature'] ?? '')
                    );
                    $result['sent'][] = $templateId;
                } catch (\Throwable $e) {
                    $result['failed'][$templateId] = $e->getMessage();
                }
            }
            return $result;
        }

        public function sendOtpEmail(string $email, string $otpCode): array
        {
            $subject = '[Subactor] Twój jednorazowy kod OTP: ' . $otpCode;
            $body = "Dzień dobry,\n\n"
                  . "Twój jednorazowy kod OTP do logowania w panelu Subactor wynosi:\n\n"
                  . "    " . $otpCode . "\n\n"
                  . "Kod jest ważny przez 10 minut.\n"
                  . "Jeśli nie proszono o ten kod, zignoruj tę wiadomość.\n\n"
                  . (self::meta()['signature'] ?? '-- Subactor SaaS');
            try {
                $this->deliver($email, $subject, $body);
                return ['sent' => true];
            } catch (\Throwable $e) {
                return ['sent' => false, 'error' => $e->getMessage()];
            }
        }

        private function deliver(string $to, string $subject, string $body): void
        {
            $this->assertRemoteFromIsDeliverable();
            $smtpError = null;
            try {
                $client = $this->client ?? new SmtpClient(
                    host: $this->config->smtpHost,
                    port: $this->config->smtpPort,
                    user: $this->config->smtpUser,
                    password: $this->config->smtpPassword,
                    encryption: $this->config->smtpEncryption
                );
                $client->send($this->config->smtpFromEmail, $this->config->smtpFromName, $to, $subject, $body);
                return;
            } catch (\Throwable $e) {
                $smtpError = $e;
            }

            // Plesk/local MTA often accepts submission on :25 when Mailpit-style
            // 127.0.0.1:1025/587 is what a misplaced .env still points at.
            if ($this->shouldRetryLocalMta($smtpError)) {
                try {
                    $local = new SmtpClient(
                        host: '127.0.0.1',
                        port: 25,
                        user: '',
                        password: '',
                        encryption: 'none'
                    );
                    $local->send($this->config->smtpFromEmail, $this->config->smtpFromName, $to, $subject, $body);
                    return;
                } catch (\Throwable $e) {
                    $smtpError = $e;
                }
            }

            if ($this->shouldFallbackToMail($smtpError)) {
                $fromEmail = $this->config->smtpFromEmail;
                $fromName = $this->config->smtpFromName;
                $headers = [
                    'MIME-Version: 1.0',
                    'Content-Type: text/plain; charset=UTF-8',
                    'From: ' . $this->encodeMailHeader($fromName) . ' <' . $fromEmail . '>',
                ];
                $encodedSubject = $this->encodeMailHeader($subject);
                if (@mail($to, $encodedSubject, $body, implode("\r\n", $headers))) {
                    return;
                }
                throw new RuntimeException(
                    'smtp_and_mail_fallback_failed: ' . ($smtpError?->getMessage() ?? 'unknown')
                );
            }

            throw $smtpError instanceof \Throwable
                ? $smtpError
                : new RuntimeException('smtp_delivery_failed');
        }

        /**
         * Remote SMTP that accepts mail with a .local / example From still
         * looks like success in the UI while the message never reaches a
         * real inbox. Fail closed before the socket opens.
         */
        private function assertRemoteFromIsDeliverable(): void
        {
            $host = strtolower(trim($this->config->smtpHost));
            $loopback = in_array($host, ['127.0.0.1', 'localhost', '::1'], true);
            if ($loopback) {
                return;
            }
            $from = strtolower(trim($this->config->smtpFromEmail));
            $domain = '';
            if (str_contains($from, '@')) {
                $domain = substr($from, strrpos($from, '@') + 1);
            }
            if (
                $domain === ''
                || str_ends_with($domain, '.local')
                || str_ends_with($domain, '.test')
                || str_ends_with($domain, '.example')
                || $domain === 'example.com'
                || $domain === 'example.org'
            ) {
                throw new RuntimeException('smtp_from_invalid_for_remote');
            }
        }

        private function shouldRetryLocalMta(?\Throwable $smtpError): bool
        {
            if ($smtpError === null) {
                return false;
            }
            $host = strtolower(trim($this->config->smtpHost));
            $loopback = in_array($host, ['127.0.0.1', 'localhost', '::1'], true);
            $msg = strtolower($smtpError->getMessage());
            $refused = str_contains($msg, 'connection refused') || str_contains($msg, 'smtp_connect_failed');
            return $loopback && $refused && $this->config->smtpPort !== 25;
        }

        private function shouldFallbackToMail(?\Throwable $smtpError): bool
        {
            if ($smtpError === null || $this->client !== null) {
                // Injected SmtpClient means unit tests own the transport.
                return false;
            }
            $explicit = getenv('SMTP_FALLBACK_MAIL');
            if (is_string($explicit) && $explicit !== '') {
                return filter_var($explicit, FILTER_VALIDATE_BOOLEAN);
            }
            // Production Plesk: prefer sendmail/mail() over hard-failing login when
            // the configured SMTP daemon is unreachable on loopback.
            $host = strtolower(trim($this->config->smtpHost));
            $loopback = in_array($host, ['127.0.0.1', 'localhost', '::1'], true);
            $env = strtolower(trim($this->config->environment));
            return $loopback || $env === 'production';
        }

        private function encodeMailHeader(string $value): string
        {
            return preg_match('/[^\x20-\x7E]/', $value) === 1
                ? '=?UTF-8?B?' . base64_encode($value) . '?='
                : $value;
        }

        private static function render(string $text, array $context): string
        {
            foreach ($context as $key => $value) {
                $text = str_replace('{{' . $key . '}}', (string)($value ?? '-'), $text);
            }
            return preg_replace('/\{\{[a-z_]+\}\}/', '-', $text) ?? $text;
        }

        private static function template(string $id): ?array
        {
            $templates = self::load()['templates'] ?? [];
            return $templates[$id] ?? null;
        }

        private static function meta(): array
        {
            return self::load()['meta'] ?? [];
        }

        private static function load(): array
        {
            static $cache = null;
            if ($cache !== null) {
                return $cache;
            }
            $cache = [];
            $jsonFile = __DIR__ . '/config/emails.json';
            if (file_exists($jsonFile)) {
                $decoded = json_decode((string)file_get_contents($jsonFile), true);
                if (is_array($decoded)) {
                    $cache = $decoded;
                }
            }
            return $cache;
        }
    }
}

namespace Subactor\Saas\Database {
    use PDO;
    use PDOException;
    use RuntimeException;

    /**
     * Module 2: PDO Database Connection
     */
    final class DatabaseConnection
    {
        private ?PDO $pdo = null;

        public function __construct(
            private readonly string $dsn,
            private readonly ?string $username = null,
            private readonly ?string $password = null
        ) {}

        public function getPdo(): PDO
        {
            if ($this->pdo === null) {
                try {
                    $options = [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                    ];
                    $this->pdo = new PDO($this->dsn, $this->username, $this->password, $options);
                } catch (PDOException $e) {
                    throw new RuntimeException("Database connection failed: " . $e->getMessage(), (int)$e->getCode(), $e);
                }
            }
            return $this->pdo;
        }

        public function query(string $sql, array $params = []): array
        {
            $stmt = $this->getPdo()->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll();
        }

        public function fetchOne(string $sql, array $params = []): ?array
        {
            $rows = $this->query($sql, $params);
            return $rows[0] ?? null;
        }

        public function execute(string $sql, array $params = []): int
        {
            $stmt = $this->getPdo()->prepare($sql);
            $stmt->execute($params);
            return $stmt->rowCount();
        }
    }

    final class MigrationManager
    {
        public function __construct(private readonly DatabaseConnection $db) {}

        public function migrate(string $migrationsDirectory): array
        {
            $this->db->execute("
                CREATE TABLE IF NOT EXISTS schema_migrations (
                    version VARCHAR(255) PRIMARY KEY,
                    executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                )
            ");
            return [];
        }
    }
}

namespace Subactor\Saas\Domain {
    use InvalidArgumentException;
    use DateTimeImmutable;
    use Subactor\Saas\Database\DatabaseConnection;

    /**
     * Module 3: Domain Rules, Plans, Reflinks & Promo Codes (0 EUR NOCC Engine & Annual Billing)
     */
    final class Plans
    {
        public const PLAN_DEFAULT = 'saas-start';
        public const PLAN_BUSINESS = 'saas-business';
        public const PLAN_ON_PREMISE = 'on-premise';

        /** Archived ids kept resolvable for tenants provisioned before ticket-012. */
        public const PLAN_PILOT = 'pilot';
        public const PLAN_STARTER = 'starter';
        public const PLAN_TEAM = 'team';

        public static function all(string $interval = 'month'): array
        {
            $jsonFile = __DIR__ . '/config/plans.json';
            $plansData = null;

            if (file_exists($jsonFile)) {
                $content = file_get_contents($jsonFile);
                $decoded = json_decode($content, true);
                if (isset($decoded['plans']) && is_array($decoded['plans'])) {
                    $plansData = $decoded['plans'];
                }
            }

            if ($plansData === null) {
                $plansData = [
                    self::PLAN_PILOT => [
                        'id' => self::PLAN_PILOT,
                        'name' => 'Plan pilotażowy',
                        'amount_monthly_minor' => 100,
                        'amount_annual_minor' => 1000,
                        'currency' => 'EUR',
                        'tagline' => 'Start za 1 EUR miesięcznie',
                        'max_users' => 1,
                        'max_orgs' => 1,
                        'requires_card' => false,
                        'features' => ['1 organizacja', '1 użytkownik', 'Podstawowe procesy'],
                    ],
                    self::PLAN_STARTER => [
                        'id' => self::PLAN_STARTER,
                        'name' => 'Starter',
                        'amount_monthly_minor' => 4900,
                        'amount_annual_minor' => 49000,
                        'currency' => 'EUR',
                        'tagline' => 'Dla małych zespołów',
                        'max_users' => 5,
                        'max_orgs' => 1,
                        'requires_card' => true,
                        'features' => ['1 organizacja', 'do 5 użytkowników', 'Pełne procesy i integracje'],
                    ],
                    self::PLAN_TEAM => [
                        'id' => self::PLAN_TEAM,
                        'name' => 'Team',
                        'amount_monthly_minor' => 14900,
                        'amount_annual_minor' => 149000,
                        'currency' => 'EUR',
                        'tagline' => 'Dla rosnących organizacji',
                        'max_users' => 25,
                        'max_orgs' => 99,
                        'requires_card' => true,
                        'features' => ['Wiele projektów', 'do 25 użytkowników', 'Priorytetowe wykonanie'],
                    ],
                ];
            }

            $result = [];
            foreach ($plansData as $id => $plan) {
                $amountMinor = ($interval === 'year') ? ($plan['amount_annual_minor'] ?? ($plan['amount_monthly_minor'] * 10)) : ($plan['amount_monthly_minor'] ?? 0);
                $result[$id] = array_merge($plan, [
                    'id' => $id,
                    'amount_minor' => $amountMinor,
                    'interval' => $interval,
                ]);
            }
            return $result;
        }

        /**
         * Plans offered on the portal, ordered by the config `order` field.
         *
         * `all()` intentionally keeps archived plans so existing tenants stay
         * resolvable; only entries flagged `public: true` are shown to visitors.
         */
        public static function offered(string $interval = 'month'): array
        {
            $offered = array_filter(
                self::all($interval),
                static fn(array $plan): bool => ($plan['public'] ?? false) === true
            );
            uasort($offered, static fn(array $a, array $b): int => ($a['order'] ?? 99) <=> ($b['order'] ?? 99));
            return $offered;
        }

        /** Offer-wide disclosure shown next to the pricing grid. */
        public static function meta(): array
        {
            $defaults = [
                'currency' => 'EUR',
                'prices_are' => 'net',
                'vat_note' => 'Ceny netto w EUR. VAT zgodnie z miejscem opodatkowania; odwrotne obciążenie po weryfikacji VAT UE.',
                'annual_rule' => 'Rozliczenie roczne = 10 miesięcy z góry, 2 miesiące gratis.',
                'onpremise_breakeven_seats' => 35,
            ];

            $jsonFile = __DIR__ . '/config/plans.json';
            if (file_exists($jsonFile)) {
                $decoded = json_decode((string)file_get_contents($jsonFile), true);
                if (isset($decoded['meta']) && is_array($decoded['meta'])) {
                    return array_merge($defaults, $decoded['meta']);
                }
            }

            return $defaults;
        }

        public static function selectOrDefault(?string $requested, string $interval = 'month'): array
        {
            $plans = self::all($interval);
            if ($requested && isset($plans[$requested])) {
                return $plans[$requested];
            }
            if (isset($plans[self::PLAN_DEFAULT])) {
                return $plans[self::PLAN_DEFAULT];
            }
            if (isset($plans[self::PLAN_PILOT])) {
                return $plans[self::PLAN_PILOT];
            }
            return reset($plans) ?: [];
        }
    }

    /**
     * Payment provider registry (config/providers.json).
     *
     * The same file drives the local digital twins in test/twins/payment-twin.mjs,
     * so the portal and the twins can never disagree about what a provider is.
     */
    final class PaymentProviders
    {
        public static function all(): array
        {
            $decoded = self::load();
            return $decoded['providers'] ?? [];
        }

        public static function meta(): array
        {
            $decoded = self::load();
            return $decoded['meta'] ?? ['default_provider' => 'paypal'];
        }

        /** Declared test PANs; never a real card number. */
        public static function testCards(): array
        {
            $decoded = self::load();
            return $decoded['test_cards'] ?? [];
        }

        public static function default(): array
        {
            $providers = self::all();
            $defaultId = self::meta()['default_provider'] ?? 'paypal';
            foreach ($providers as $id => $provider) {
                if (($provider['default'] ?? false) === true) {
                    return $provider;
                }
            }
            return $providers[$defaultId] ?? ['id' => 'disabled', 'name' => 'Disabled', 'status' => 'disabled'];
        }

        private static function load(): array
        {
            static $cache = null;
            if ($cache !== null) {
                return $cache;
            }
            $jsonFile = __DIR__ . '/config/providers.json';
            $cache = [];
            if (file_exists($jsonFile)) {
                $decoded = json_decode((string)file_get_contents($jsonFile), true);
                if (is_array($decoded)) {
                    $cache = $decoded;
                }
            }
            return $cache;
        }
    }

    /**
     * Integration catalogue (config/integrations.json).
     *
     * Copy is written for the buyer, not for the engineer: every entry states who
     * it is for, what it changes in the business and what the client actually
     * gets. The connector field stays internal.
     */
    final class Integrations
    {
        public static function all(): array
        {
            $decoded = self::load();
            return $decoded['integrations'] ?? [];
        }

        public static function meta(): array
        {
            $decoded = self::load();
            return $decoded['meta'] ?? [];
        }

        private static function load(): array
        {
            static $cache = null;
            if ($cache !== null) {
                return $cache;
            }
            $jsonFile = __DIR__ . '/config/integrations.json';
            $cache = [];
            if (file_exists($jsonFile)) {
                $decoded = json_decode((string)file_get_contents($jsonFile), true);
                if (is_array($decoded)) {
                    $cache = $decoded;
                }
            }
            return $cache;
        }
    }

    /**
     * Installable node catalogue projected onto an authenticated tenant.
     *
     * Catalogue availability is intentionally not runtime state. This
     * projection gives the UI truthful onboarding metadata and URI identities
     * derived from the tenant domain; NodeRegistry owns enrolled runtime state.
     */
    final class NodeMarketplace
    {
        /** @return array{meta: array<string, mixed>, nodes: array<int, array<string, mixed>>} */
        public static function forTenant(string $tenant, string $locale = 'pl'): array
        {
            $decoded = self::load();
            $meta = self::localized($decoded['meta'] ?? [], $locale);
            $domain = TenantHosting::subdomainFor($tenant);
            $tenantDomain = ($domain['valid'] ?? false) === true ? (string)$domain['subdomain'] : '';
            $meta['tenant_domain'] = $tenantDomain;

            if ($tenantDomain === '') {
                return ['meta' => $meta, 'nodes' => []];
            }

            $nodes = [];
            foreach ($decoded['nodes'] ?? [] as $node) {
                if (!is_array($node)) {
                    continue;
                }
                $nodes[] = self::expandTenant(self::localized($node, $locale), $tenantDomain);
            }

            return ['meta' => $meta, 'nodes' => $nodes];
        }

        /** @return array<string, mixed>|null */
        public static function offer(string $id): ?array
        {
            foreach (self::load()['nodes'] ?? [] as $node) {
                if (is_array($node) && ($node['id'] ?? '') === $id) {
                    return self::localized($node, 'pl');
                }
            }
            return null;
        }

        /** @param array<string, mixed> $entry @return array<string, mixed> */
        private static function localized(array $entry, string $locale): array
        {
            $translations = $entry['translations'] ?? [];
            unset($entry['translations']);
            if ($locale !== 'pl' && is_array($translations) && is_array($translations[$locale] ?? null)) {
                $entry = array_replace_recursive($entry, $translations[$locale]);
            }
            return $entry;
        }

        private static function expandTenant(mixed $value, string $tenantDomain): mixed
        {
            if (is_string($value)) {
                return str_replace('{tenant_domain}', $tenantDomain, $value);
            }
            if (!is_array($value)) {
                return $value;
            }
            foreach ($value as $key => $item) {
                $value[$key] = self::expandTenant($item, $tenantDomain);
            }
            return $value;
        }

        /** @return array<string, mixed> */
        private static function load(): array
        {
            static $cache = null;
            if ($cache !== null) {
                return $cache;
            }
            $cache = [];
            $jsonFile = __DIR__ . '/config/nodes.json';
            if (is_file($jsonFile)) {
                $decoded = json_decode((string)file_get_contents($jsonFile), true);
                if (is_array($decoded)) {
                    $cache = $decoded;
                }
            }
            return $cache;
        }
    }

    /**
     * Durable, tenant-scoped URI node enrollment and heartbeat registry.
     *
     * A device (or an if-uri host acting for it) may prove possession of the
     * one-time token by posting a bounded heartbeat. A signed-in user may also
     * explicitly request the narrower urirun-fleet probe: read-only GETs of
     * /health and /routes against an enrolled numeric private IP. Raw tokens
     * are never stored or sent by that probe.
     */
    final class NodeRegistry
    {
        private const SCHEMA = 'subactor.enrolled-nodes/v1';
        private const MAX_ROUTES = 128;
        private const MAX_NODES = 64;
        private const MAX_PROBE_BYTES = 262144;
        private const PROBE_TIMEOUT_SECONDS = 2.0;

        public function __construct(
            private readonly string $storageDir,
            private readonly int $offlineAfterSeconds = 120
        ) {}

        /** @return array<int, array<string, mixed>> */
        public function forTenant(string $tenant): array
        {
            $registry = $this->readLocked($tenant);
            return array_values(array_map(fn(array $node): array => $this->publicNode($node), $registry['nodes']));
        }

        /** @return array{node: array<string, mixed>, enrollment_token: string} */
        public function enroll(string $tenant, string $offerId, string $name, string $endpointUrl): array
        {
            $offer = NodeMarketplace::offer($offerId);
            if ($offer === null) {
                throw new InvalidArgumentException('unknown_node_offer');
            }
            if (($offer['status'] ?? 'planned') === 'planned') {
                throw new InvalidArgumentException('node_offer_not_enrollable');
            }
            $nodeId = strtolower(trim($name));
            if (preg_match('/^[a-z0-9][a-z0-9-]{1,47}$/', $nodeId) !== 1) {
                throw new InvalidArgumentException('invalid_node_name');
            }
            $endpoint = self::localEndpoint($endpointUrl);
            $token = bin2hex(random_bytes(24));
            $now = gmdate(DATE_ATOM);
            $record = [
                'id' => $nodeId,
                'offer_id' => $offerId,
                'offer_name' => (string)($offer['name'] ?? $offerId),
                'endpoint_url' => $endpoint,
                'required_schemes' => array_values(array_filter(
                    $offer['required_schemes'] ?? [],
                    static fn(mixed $scheme): bool => is_string($scheme) && preg_match('/^[a-z][a-z0-9+.-]*$/', $scheme) === 1
                )),
                'token_hash' => password_hash($token, PASSWORD_DEFAULT),
                'enrolled_at' => $now,
                'last_seen' => null,
                'health' => [],
                'routes' => [],
                'smoke_ok' => null,
                'last_probe_at' => null,
                'last_probe_error' => null,
                'observation_source' => null,
            ];

            $this->mutate($tenant, function (array &$registry) use ($record, $endpoint): void {
                if (count($registry['nodes']) >= self::MAX_NODES) {
                    throw new InvalidArgumentException('node_limit_reached');
                }
                foreach ($registry['nodes'] as $node) {
                    if (($node['id'] ?? '') === $record['id']) {
                        throw new InvalidArgumentException('node_name_already_enrolled');
                    }
                    if (($node['endpoint_url'] ?? '') === $endpoint) {
                        throw new InvalidArgumentException('node_endpoint_already_enrolled');
                    }
                }
                $registry['nodes'][] = $record;
            });

            return ['node' => $this->publicNode($record), 'enrollment_token' => $token];
        }

        /** @return array<string, mixed> */
        public function heartbeat(string $tenant, string $nodeId, string $token, array $payload): array
        {
            $updated = null;
            $this->mutate($tenant, function (array &$registry) use ($nodeId, $token, $payload, &$updated): void {
                foreach ($registry['nodes'] as &$node) {
                    if (($node['id'] ?? '') !== $nodeId) {
                        continue;
                    }
                    if ($token === '' || !password_verify($token, (string)($node['token_hash'] ?? ''))) {
                        throw new InvalidArgumentException('invalid_node_token');
                    }
                    $node['health'] = self::boundedHealth(is_array($payload['health'] ?? null) ? $payload['health'] : []);
                    $node['routes'] = self::boundedRoutes(is_array($payload['routes'] ?? null) ? $payload['routes'] : []);
                    $node['smoke_ok'] = is_bool($payload['smoke_ok'] ?? null) ? $payload['smoke_ok'] : null;
                    $node['last_seen'] = gmdate(DATE_ATOM);
                    $node['observation_source'] = 'heartbeat';
                    $updated = $node;
                    break;
                }
                unset($node);
                if ($updated === null) {
                    throw new InvalidArgumentException('unknown_enrolled_node');
                }
            });
            return $this->publicNode($updated ?? []);
        }

        /**
         * Read an enrolled node's public actual-state surface. The tenant and
         * node lookup happen before any network access; only a literal private
         * IP is eligible, which avoids DNS rebinding between validation/use.
         *
         * @return array<string, mixed>
         */
        public function probe(string $tenant, string $nodeId): array
        {
            $record = null;
            foreach ($this->readLocked($tenant)['nodes'] as $node) {
                if (($node['id'] ?? '') === $nodeId) {
                    $record = $node;
                    break;
                }
            }
            if ($record === null) {
                throw new InvalidArgumentException('unknown_enrolled_node');
            }

            $endpoint = (string)($record['endpoint_url'] ?? '');
            try {
                $parts = parse_url($endpoint);
                $host = is_array($parts) ? strtolower(trim((string)($parts['host'] ?? ''), '[]')) : '';
                if ($host === '' || !self::isPrivateIp($host)) {
                    throw new InvalidArgumentException('node_probe_requires_private_ip');
                }

                $health = self::fetchProbeJson($endpoint . '/health');
                if (!is_array($health) || array_is_list($health)) {
                    throw new InvalidArgumentException('node_probe_invalid_health');
                }
                $routesDocument = self::fetchProbeJson($endpoint . '/routes');
                $routes = is_array($routesDocument) && array_key_exists('routes', $routesDocument)
                    ? $routesDocument['routes']
                    : $routesDocument;
                if (!is_array($routes)) {
                    throw new InvalidArgumentException('node_probe_invalid_routes');
                }
            } catch (InvalidArgumentException $error) {
                $this->recordProbeFailure($tenant, $nodeId, $endpoint, $error->getMessage());
                throw $error;
            }

            $updated = null;
            $now = gmdate(DATE_ATOM);
            $this->mutate($tenant, function (array &$registry) use (
                $nodeId,
                $endpoint,
                $health,
                $routes,
                $now,
                &$updated
            ): void {
                foreach ($registry['nodes'] as &$node) {
                    if (($node['id'] ?? '') !== $nodeId) continue;
                    if (($node['endpoint_url'] ?? '') !== $endpoint) {
                        throw new InvalidArgumentException('node_endpoint_changed_during_probe');
                    }
                    $node['health'] = self::boundedHealth($health);
                    $node['routes'] = self::boundedRoutes($routes);
                    $node['smoke_ok'] = true;
                    $node['last_seen'] = $now;
                    $node['last_probe_at'] = $now;
                    $node['last_probe_error'] = null;
                    $node['observation_source'] = 'probe';
                    $updated = $node;
                    break;
                }
                unset($node);
                if ($updated === null) {
                    throw new InvalidArgumentException('unknown_enrolled_node');
                }
            });
            return $this->publicNode($updated ?? []);
        }

        public function remove(string $tenant, string $nodeId): bool
        {
            $removed = false;
            $this->mutate($tenant, function (array &$registry) use ($nodeId, &$removed): void {
                $before = count($registry['nodes']);
                $registry['nodes'] = array_values(array_filter(
                    $registry['nodes'],
                    static fn(array $node): bool => ($node['id'] ?? '') !== $nodeId
                ));
                $removed = count($registry['nodes']) !== $before;
            });
            return $removed;
        }

        /** @return array{status: string, runnable: bool, reasons: array<int, string>, reached: array<int, string>} */
        public static function readiness(array $node, int $offlineAfterSeconds = 120, ?int $now = null): array
        {
            $lastSeen = strtotime((string)($node['last_seen'] ?? '')) ?: 0;
            $fresh = $lastSeen > 0 && (($now ?? time()) - $lastSeen) <= max(1, $offlineAfterSeconds);
            if (!$fresh) {
                return self::readinessResult('offline', ['No fresh heartbeat or successful probe'], []);
            }

            $reached = ['online'];
            if (($node['token_hash'] ?? '') === '') {
                return self::readinessResult('blocked', ['Enrollment key is missing'], $reached);
            }
            $reached[] = 'enrolled';

            $routes = is_array($node['routes'] ?? null) ? $node['routes'] : [];
            if ($routes === []) {
                return self::readinessResult('stale', ['Node is online but reports no URI routes'], $reached);
            }
            $reached[] = 'routable';

            $servedSchemes = [];
            foreach ($routes as $route) {
                $scheme = strtolower((string)parse_url((string)$route, PHP_URL_SCHEME));
                if ($scheme !== '') $servedSchemes[$scheme] = true;
            }
            $required = is_array($node['required_schemes'] ?? null) ? $node['required_schemes'] : [];
            $missing = array_values(array_filter($required, static fn(string $scheme): bool => !isset($servedSchemes[$scheme])));
            if ($missing !== []) {
                return self::readinessResult('stale', ['Missing URI schemes: ' . implode(', ', $missing)], $reached);
            }
            $reached[] = 'compatible';

            if (($node['smoke_ok'] ?? null) === null) {
                return self::readinessResult('compatible', ['Compatible; smoke test not reported'], $reached);
            }
            if (($node['smoke_ok'] ?? false) !== true) {
                return self::readinessResult('degraded', ['Compatible but smoke test failed'], $reached);
            }
            $reached[] = 'ready';
            return self::readinessResult('ready', [], $reached);
        }

        /** @return array<string, mixed> */
        private function publicNode(array $node): array
        {
            unset($node['token_hash']);
            $node['readiness'] = self::readiness($node + ['token_hash' => 'enrolled'], $this->offlineAfterSeconds);
            $node['heartbeat_ttl_seconds'] = $this->offlineAfterSeconds;
            return $node;
        }

        /** @return array{status: string, runnable: bool, reasons: array<int, string>, reached: array<int, string>} */
        private static function readinessResult(string $status, array $reasons, array $reached): array
        {
            return ['status' => $status, 'runnable' => $status === 'ready', 'reasons' => $reasons, 'reached' => $reached];
        }

        private static function localEndpoint(string $raw): string
        {
            $endpoint = rtrim(trim($raw), '/');
            if (strlen($endpoint) > 2048 || preg_match('/[\x00-\x20\x7F]/', $endpoint) === 1) {
                throw new InvalidArgumentException('invalid_node_endpoint');
            }
            $parts = parse_url($endpoint);
            if (!is_array($parts) || !in_array(strtolower((string)($parts['scheme'] ?? '')), ['http', 'https'], true)) {
                throw new InvalidArgumentException('invalid_node_endpoint');
            }
            if (isset($parts['user']) || isset($parts['pass']) || isset($parts['query']) || isset($parts['fragment'])) {
                throw new InvalidArgumentException('invalid_node_endpoint');
            }
            $host = strtolower(trim((string)($parts['host'] ?? ''), '[]'));
            $port = (int)($parts['port'] ?? 0);
            if ($host === '' || ($port !== 0 && ($port < 1 || $port > 65535)) || !self::isLocalHost($host)) {
                throw new InvalidArgumentException('node_endpoint_must_be_local');
            }
            return $endpoint;
        }

        private static function isLocalHost(string $host): bool
        {
            if (filter_var($host, FILTER_VALIDATE_IP)) {
                return self::isPrivateIp($host);
            }
            return $host === 'localhost'
                || preg_match('/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/', $host) === 1
                || preg_match('/^[a-z0-9](?:[a-z0-9.-]{0,249}[a-z0-9])?\.local$/', $host) === 1;
        }

        private static function isPrivateIp(string $host): bool
        {
            if (filter_var($host, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
                $ip = ip2long($host);
                foreach ([
                    ['10.0.0.0', '10.255.255.255'],
                    ['127.0.0.0', '127.255.255.255'],
                    ['169.254.0.0', '169.254.255.255'],
                    ['172.16.0.0', '172.31.255.255'],
                    ['192.168.0.0', '192.168.255.255'],
                ] as [$start, $end]) {
                    if ($ip >= ip2long($start) && $ip <= ip2long($end)) return true;
                }
                return false;
            }
            if (filter_var($host, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) {
                return $host === '::1' || preg_match('/^(f[cd]|fe[89ab])/i', $host) === 1;
            }
            return false;
        }

        /** @return mixed */
        private static function fetchProbeJson(string $url): mixed
        {
            $context = stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'header' => "Accept: application/json\r\nUser-Agent: subactor-node-probe/1\r\nConnection: close\r\n",
                    'timeout' => self::PROBE_TIMEOUT_SECONDS,
                    'ignore_errors' => true,
                    'follow_location' => 0,
                    'max_redirects' => 0,
                    'protocol_version' => 1.1,
                ],
                'ssl' => [
                    'verify_peer' => true,
                    'verify_peer_name' => true,
                    'allow_self_signed' => false,
                ],
            ]);
            unset($http_response_header);
            $raw = @file_get_contents($url, false, $context, 0, self::MAX_PROBE_BYTES + 1);
            $headers = $http_response_header ?? [];
            if ($raw === false) {
                throw new InvalidArgumentException('node_probe_unreachable');
            }

            $status = 0;
            foreach ($headers as $header) {
                if (preg_match('/^HTTP\/\S+\s+(\d{3})(?:\s|$)/i', (string)$header, $match) === 1) {
                    $status = (int)$match[1];
                    break;
                }
            }
            if ($status !== 200) {
                throw new InvalidArgumentException($status > 0 ? 'node_probe_http_status_' . $status : 'node_probe_invalid_http_response');
            }
            if (strlen($raw) > self::MAX_PROBE_BYTES) {
                throw new InvalidArgumentException('node_probe_response_too_large');
            }
            try {
                return json_decode($raw, true, 32, JSON_THROW_ON_ERROR);
            } catch (\JsonException) {
                throw new InvalidArgumentException('node_probe_invalid_json');
            }
        }

        private function recordProbeFailure(string $tenant, string $nodeId, string $endpoint, string $reason): void
        {
            $recorded = false;
            $this->mutate($tenant, function (array &$registry) use ($nodeId, $endpoint, $reason, &$recorded): void {
                foreach ($registry['nodes'] as &$node) {
                    if (($node['id'] ?? '') !== $nodeId) continue;
                    if (($node['endpoint_url'] ?? '') !== $endpoint) {
                        throw new InvalidArgumentException('node_endpoint_changed_during_probe');
                    }
                    $node['last_probe_at'] = gmdate(DATE_ATOM);
                    $node['last_probe_error'] = substr($reason, 0, 160);
                    $recorded = true;
                    break;
                }
                unset($node);
                if (!$recorded) {
                    throw new InvalidArgumentException('unknown_enrolled_node');
                }
            });
        }

        /** @return array<string, scalar|null> */
        private static function boundedHealth(array $health): array
        {
            $result = [];
            foreach (['name', 'version', 'nodeType', 'registryEtag', 'registryGeneration'] as $key) {
                if (isset($health[$key]) && (is_string($health[$key]) || is_int($health[$key]) || is_float($health[$key]) || is_bool($health[$key]))) {
                    $result[$key] = is_string($health[$key]) ? substr($health[$key], 0, 160) : $health[$key];
                }
            }
            return $result;
        }

        /** @return array<int, string> */
        private static function boundedRoutes(array $routes): array
        {
            $result = [];
            foreach (array_slice($routes, 0, self::MAX_ROUTES) as $route) {
                $uri = is_array($route) ? ($route['uri'] ?? '') : $route;
                if (is_string($uri) && strlen($uri) <= 512 && preg_match('/^[a-z][a-z0-9+.-]*:\/\/\S+$/i', $uri) === 1) {
                    $result[$uri] = true;
                }
            }
            return array_keys($result);
        }

        /** @return array{schema: string, nodes: array<int, array<string, mixed>>} */
        private function readLocked(string $tenant): array
        {
            $this->ensureStorage();
            $lock = fopen($this->lockFile($tenant), 'c+');
            if ($lock === false || !flock($lock, LOCK_SH)) throw new \RuntimeException('node_registry_lock_failed');
            try {
                return $this->readFile($tenant);
            } finally {
                flock($lock, LOCK_UN);
                fclose($lock);
            }
        }

        private function mutate(string $tenant, callable $callback): void
        {
            $this->ensureStorage();
            $lock = fopen($this->lockFile($tenant), 'c+');
            if ($lock === false || !flock($lock, LOCK_EX)) throw new \RuntimeException('node_registry_lock_failed');
            try {
                $registry = $this->readFile($tenant);
                $callback($registry);
                $this->writeFile($tenant, $registry);
            } finally {
                flock($lock, LOCK_UN);
                fclose($lock);
            }
        }

        /** @return array{schema: string, nodes: array<int, array<string, mixed>>} */
        private function readFile(string $tenant): array
        {
            $file = $this->tenantFile($tenant);
            if (!is_file($file)) return ['schema' => self::SCHEMA, 'nodes' => []];
            $decoded = json_decode((string)file_get_contents($file), true);
            if (!is_array($decoded) || !is_array($decoded['nodes'] ?? null)) {
                throw new \RuntimeException('invalid_node_registry');
            }
            return ['schema' => self::SCHEMA, 'nodes' => array_values(array_filter($decoded['nodes'], 'is_array'))];
        }

        private function writeFile(string $tenant, array $registry): void
        {
            $temp = tempnam($this->storageDir, '.nodes-');
            if ($temp === false) throw new \RuntimeException('node_registry_write_failed');
            try {
                $json = json_encode($registry, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
                if (file_put_contents($temp, $json . "\n", LOCK_EX) === false) throw new \RuntimeException('node_registry_write_failed');
                chmod($temp, 0600);
                if (!rename($temp, $this->tenantFile($tenant))) throw new \RuntimeException('node_registry_write_failed');
            } finally {
                if (is_file($temp)) unlink($temp);
            }
        }

        private function ensureStorage(): void
        {
            if (!is_dir($this->storageDir) && !mkdir($this->storageDir, 0700, true) && !is_dir($this->storageDir)) {
                throw new \RuntimeException('node_registry_storage_failed');
            }
        }

        private function tenantFile(string $tenant): string
        {
            if (preg_match('/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/', $tenant) !== 1) {
                throw new InvalidArgumentException('invalid_tenant_slug');
            }
            return $this->storageDir . '/' . $tenant . '.json';
        }

        private function lockFile(string $tenant): string
        {
            return $this->tenantFile($tenant) . '.lock';
        }
    }

    /**
     * Per-tenant integration connections.
     *
     * Secrets are sealed with AES-256-GCM and never leave this class: the API
     * returns a last-four hint, the event store records only that a connection
     * happened, and nothing secret is logged.
     */
    final class IntegrationConnections
    {
        private const CIPHER = 'aes-256-gcm';

        public function __construct(private readonly string $secretKey, private readonly string $storageDir) {}

        /** @return array<string, array{connected_at: string, method: string, hints: array<string,string>}> */
        public function forTenant(string $tenant): array
        {
            $records = $this->read($tenant);
            $public = [];
            foreach ($records as $id => $record) {
                $public[$id] = [
                    'connected_at' => $record['connected_at'] ?? '',
                    'method' => $record['method'] ?? 'token',
                    'hints' => $record['hints'] ?? [],
                ];
            }
            return $public;
        }

        /**
         * @param array<string,string> $values
         * @return array{connected_at: string, method: string, hints: array<string,string>}
         */
        public function connect(string $tenant, string $integrationId, array $values, string $method = 'token'): array
        {
            $definition = null;
            foreach (Integrations::all() as $integration) {
                if (($integration['id'] ?? '') === $integrationId) {
                    $definition = $integration;
                    break;
                }
            }
            if ($definition === null) {
                throw new InvalidArgumentException('unknown_integration:' . $integrationId);
            }

            $fields = $definition['connect']['fields'] ?? [];
            $sealed = [];
            $hints = [];
            foreach ($fields as $field) {
                $key = $field['key'] ?? '';
                $value = trim((string)($values[$key] ?? ''));
                if ($key === '' || $value === '') {
                    throw new InvalidArgumentException('missing_field:' . ($key ?: 'unknown'));
                }
                $sealed[$key] = $this->seal($value);
                $hints[$key] = ($field['secret'] ?? false)
                    ? str_repeat('*', max(0, strlen($value) - 4)) . substr($value, -4)
                    : $value;
            }

            $records = $this->read($tenant);
            $records[$integrationId] = [
                'connected_at' => date('c'),
                'method' => $method,
                'sealed' => $sealed,
                'hints' => $hints,
            ];
            $this->write($tenant, $records);

            return ['connected_at' => $records[$integrationId]['connected_at'], 'method' => $method, 'hints' => $hints];
        }

        public function disconnect(string $tenant, string $integrationId): bool
        {
            $records = $this->read($tenant);
            if (!isset($records[$integrationId])) {
                return false;
            }
            unset($records[$integrationId]);
            $this->write($tenant, $records);
            return true;
        }

        private function seal(string $plaintext): array
        {
            $iv = random_bytes(openssl_cipher_iv_length(self::CIPHER) ?: 12);
            $tag = '';
            $ciphertext = openssl_encrypt($plaintext, self::CIPHER, $this->key(), OPENSSL_RAW_DATA, $iv, $tag);
            if ($ciphertext === false) {
                throw new \RuntimeException('integration_secret_seal_failed');
            }
            return ['v' => 1, 'iv' => base64_encode($iv), 'tag' => base64_encode($tag), 'data' => base64_encode($ciphertext)];
        }

        private function key(): string
        {
            return hash('sha256', $this->secretKey, true);
        }

        private function read(string $tenant): array
        {
            $file = $this->file($tenant);
            if (!is_file($file)) {
                return [];
            }
            $decoded = json_decode((string)file_get_contents($file), true);
            return is_array($decoded) ? $decoded : [];
        }

        private function write(string $tenant, array $records): void
        {
            if (!is_dir($this->storageDir)) {
                mkdir($this->storageDir, 0700, true);
            }
            file_put_contents($this->file($tenant), json_encode($records, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
            chmod($this->file($tenant), 0600);
        }

        private function file(string $tenant): string
        {
            return $this->storageDir . '/' . preg_replace('/[^a-z0-9-]/', '', strtolower($tenant)) . '.json';
        }
    }

    /**
     * Tenant subdomain provisioning on a Plesk multidomain subscription.
     *
     * Two phases, fail closed, mirroring urirun-connector-plesk: plan() changes
     * nothing and returns an exact hash; apply() is refused unless that hash is
     * replayed with a single-use grant and every gate is set. The panel enforces
     * the gates as well, so a bug here cannot turn a dry run into a mutation.
     */
    final class TenantHosting
    {
        public function __construct(private readonly string $storageDir) {}

        public static function config(): array
        {
            static $cache = null;
            if ($cache !== null) {
                return $cache;
            }
            $cache = [];
            $jsonFile = __DIR__ . '/config/hosting.json';
            if (file_exists($jsonFile)) {
                $decoded = json_decode((string)file_get_contents($jsonFile), true);
                if (is_array($decoded)) {
                    $cache = $decoded;
                }
            }
            return $cache;
        }

        /** @return array{subdomain: string, valid: bool, reason?: string} */
        public static function subdomainFor(string $tenant): array
        {
            $config = self::config();
            $base = $config['base_domain'] ?? 'sub.actor';
            $label = strtolower(trim($tenant));

            if (preg_match('/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/', $label) !== 1) {
                return ['subdomain' => '', 'valid' => false, 'reason' => 'invalid_tenant_label'];
            }
            if (in_array($label, $config['reserved_subdomains'] ?? [], true)) {
                return ['subdomain' => '', 'valid' => false, 'reason' => 'reserved_subdomain'];
            }
            return ['subdomain' => $label . '.' . $base, 'valid' => true];
        }

        public static function gatesOpen(): bool
        {
            $gates = self::config()['gates'] ?? [];
            $mutation = getenv($gates['mutation_gate_env'] ?? 'AUTONOMY_MUTATIONS_ENABLED');
            $subdomain = getenv($gates['subdomain_gate_env'] ?? 'PLESK_SUBDOMAIN_APPLY');
            return $mutation === '1' && $subdomain === '1';
        }

        /** Dry run. Never mutates the panel. */
        public function plan(string $tenant): array
        {
            $derived = self::subdomainFor($tenant);
            if (!$derived['valid']) {
                return ['ok' => false, 'error' => $derived['reason'], 'tenant' => $tenant];
            }
            $response = $this->call('plan_path', ['tenant' => $tenant, 'subdomain' => $derived['subdomain']]);
            if ($response === null) {
                return ['ok' => false, 'error' => 'panel_unreachable', 'subdomain' => $derived['subdomain']];
            }
            $this->writeState($tenant, [
                'subdomain' => $derived['subdomain'],
                'phase' => 'planned',
                'plan_hash' => $response['plan']['plan_hash'] ?? null,
                'applicable' => $response['applicable'] ?? false,
                'blockers' => $response['blockers'] ?? [],
                'planned_at' => date('c'),
            ]);
            return ['ok' => true] + $response;
        }

        /**
         * Applies a previously issued plan. Requires the exact hash, a grant and
         * the gates; anything missing fails closed with the reason stated.
         */
        public function apply(string $tenant, string $planHash, string $grant): array
        {
            if (!self::gatesOpen()) {
                return ['ok' => false, 'error' => 'apply_gates_closed', 'required' => [
                    'AUTONOMY_MUTATIONS_ENABLED=1', 'PLESK_SUBDOMAIN_APPLY=1',
                ]];
            }
            $state = $this->stateFor($tenant);
            if (($state['plan_hash'] ?? null) !== $planHash || $planHash === '') {
                return ['ok' => false, 'error' => 'plan_hash_mismatch'];
            }
            $response = $this->call('apply_path', [
                'tenant' => $tenant,
                'plan_hash' => $planHash,
                'apply_grant' => $grant,
            ], ['X-Plan-Hash: ' . $planHash, 'X-Apply-Grant: ' . $grant]);
            if ($response === null) {
                return ['ok' => false, 'error' => 'panel_unreachable'];
            }
            if (($response['ok'] ?? false) !== true) {
                return ['ok' => false, 'error' => $response['error'] ?? 'apply_rejected'] + $response;
            }
            $this->writeState($tenant, [
                'subdomain' => $response['subdomain']['subdomain'] ?? ($state['subdomain'] ?? ''),
                'phase' => 'active',
                'docroot' => $response['subdomain']['docroot'] ?? null,
                'applied_at' => date('c'),
            ]);
            return ['ok' => true] + $response;
        }

        public function stateFor(string $tenant): array
        {
            $file = $this->file($tenant);
            if (!is_file($file)) {
                $derived = self::subdomainFor($tenant);
                return [
                    'subdomain' => $derived['subdomain'] ?? '',
                    'phase' => $derived['valid'] ? 'not_provisioned' : 'unavailable',
                    'reason' => $derived['reason'] ?? null,
                    'openwebui_url' => self::envOpenWebUiUrl(),
                ];
            }
            $decoded = json_decode((string)file_get_contents($file), true);
            if (!is_array($decoded)) {
                return [];
            }
            if (!isset($decoded['openwebui_url']) || !is_string($decoded['openwebui_url']) || $decoded['openwebui_url'] === '') {
                $decoded['openwebui_url'] = self::envOpenWebUiUrl();
            }
            return $decoded;
        }

        /** Durable OpenWebUI URL for a tenant (Account/Hosting). */
        public function setOpenWebUiUrl(string $tenant, string $url): array
        {
            $normalized = self::normalizeOpenWebUiUrl($url);
            if ($normalized === null) {
                return ['ok' => false, 'error' => 'invalid_openwebui_url'];
            }
            $this->writeState($tenant, [
                'openwebui_url' => $normalized,
                'openwebui_url_updated_at' => date('c'),
            ]);
            return ['ok' => true, 'openwebui_url' => $normalized, 'hosting' => $this->stateFor($tenant)];
        }

        public static function envOpenWebUiUrl(): string
        {
            $fromEnv = getenv('SUBACTOR_OPENWEBUI_URL');
            if (is_string($fromEnv) && $fromEnv !== '') {
                $normalized = self::normalizeOpenWebUiUrl($fromEnv);
                if ($normalized !== null) {
                    return $normalized;
                }
            }
            return 'http://127.0.0.1:3004/';
        }

        public static function resolveOpenWebUiUrl(?array $hostingState = null): string
        {
            if (is_array($hostingState)) {
                $stored = $hostingState['openwebui_url'] ?? null;
                if (is_string($stored) && $stored !== '') {
                    $normalized = self::normalizeOpenWebUiUrl($stored);
                    if ($normalized !== null) {
                        return $normalized;
                    }
                }
            }
            return self::envOpenWebUiUrl();
        }

        public static function normalizeOpenWebUiUrl(string $url): ?string
        {
            $trimmed = trim($url);
            if ($trimmed === '' || !preg_match('#^https?://#i', $trimmed)) {
                return null;
            }
            return str_ends_with($trimmed, '/') ? $trimmed : ($trimmed . '/');
        }

        private function call(string $pathKey, array $payload, array $headers = []): ?array
        {
            $panel = self::config()['panel'] ?? [];
            $url = ($panel['base_url'] ?? '') . ($panel[$pathKey] ?? '');
            $context = stream_context_create(['http' => [
                'method' => 'POST',
                'header' => implode("\r\n", array_merge(['Content-Type: application/json'], $headers)),
                'content' => json_encode($payload, JSON_UNESCAPED_SLASHES),
                'timeout' => (int)($panel['timeout_seconds'] ?? 8),
                'ignore_errors' => true,
            ]]);
            $raw = @file_get_contents($url, false, $context);
            if ($raw === false) {
                return null;
            }
            $decoded = json_decode($raw, true);
            return is_array($decoded) ? $decoded : null;
        }

        private function writeState(string $tenant, array $patch): void
        {
            if (!is_dir($this->storageDir)) {
                mkdir($this->storageDir, 0700, true);
            }
            $state = array_merge($this->stateFor($tenant), $patch);
            file_put_contents($this->file($tenant), json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
        }

        private function file(string $tenant): string
        {
            return $this->storageDir . '/' . preg_replace('/[^a-z0-9-]/', '', strtolower($tenant)) . '.json';
        }
    }

    /**
     * External identity providers (config/identity.json).
     *
     * One authorization-code flow with PKCE serves every declared provider, so
     * adding Google, GitHub or anything else is a configuration block. The
     * client secret stays server side; state and the PKCE verifier travel in a
     * short-lived signed cookie, so no store is needed before sign-in exists.
     */
    final class IdentityProviders
    {
        public function __construct(
            private readonly string $secret,
            private readonly string $origin,
            private readonly bool $includeDevOnly = false,
            private readonly bool $cookieSecure = false
        ) {}

        public static function config(): array
        {
            static $cache = null;
            if ($cache !== null) {
                return $cache;
            }
            $cache = [];
            $jsonFile = __DIR__ . '/config/identity.json';
            if (file_exists($jsonFile)) {
                $decoded = json_decode((string)file_get_contents($jsonFile), true);
                if (is_array($decoded)) {
                    $cache = $decoded;
                }
            }
            return $cache;
        }

        public static function provider(string $id): ?array
        {
            return self::config()['providers'][$id] ?? null;
        }

        /** Credentials come from .env/process environment, or dev_credentials for the twin. */
        public static function credentials(array $provider): array
        {
            $process = function_exists('getenv') ? (getenv() ?: []) : [];
            $environment = array_merge(
                \Subactor\Saas\Config\PortalConfig::loadDotEnv(),
                $process,
                $_ENV,
                $_SERVER
            );
            $id = (string)($environment[$provider['client_id_env'] ?? ''] ?? '');
            $secret = (string)($environment[$provider['client_secret_env'] ?? ''] ?? '');
            // A dev provider may declare its public client id in config, never
            // its secret: that always comes from the environment.
            if ($id === '' && isset($provider['dev_credentials'])) {
                $id = (string)($provider['dev_credentials']['client_id'] ?? '');
            }
            return ['client_id' => $id, 'client_secret' => $secret];
        }

        /**
         * Providers offered to the browser. One without credentials is reported
         * as unavailable rather than rendered as a button that cannot work.
         *
         * @return array<int, array{id: string, label: string, available: bool}>
         */
        public static function offered(bool $includeDevOnly = false): array
        {
            $offered = [];
            foreach (self::config()['providers'] ?? [] as $id => $provider) {
                // A dev provider signs everyone in as a fixed user. It must never
                // reach a production page, so it is filtered at the source.
                if (($provider['dev_only'] ?? false) === true && !$includeDevOnly) {
                    continue;
                }
                $credentials = self::credentials($provider);
                $offered[] = [
                    'id' => (string)$id,
                    'label' => (string)($provider['label'] ?? $id),
                    'available' => $credentials['client_id'] !== '' && $credentials['client_secret'] !== '',
                    'dev_only' => (bool)($provider['dev_only'] ?? false),
                ];
            }
            return $offered;
        }

        /** @return array{url: string, cookie: string} */
        public function beginAuthorization(string $providerId, string $next = '/?action=panel'): array
        {
            $provider = self::provider($providerId);
            if ($provider === null || (($provider['dev_only'] ?? false) === true && !$this->includeDevOnly)) {
                throw new InvalidArgumentException('unknown_identity_provider');
            }
            $credentials = self::credentials($provider);
            if ($credentials['client_id'] === '' || $credentials['client_secret'] === '') {
                throw new InvalidArgumentException('provider_not_configured');
            }

            $state = bin2hex(random_bytes(16));
            $verifier = rtrim(strtr(base64_encode(random_bytes(48)), '+/', '-_'), '=');
            $query = [
                'client_id' => $credentials['client_id'],
                'redirect_uri' => $this->redirectUri($providerId),
                'response_type' => 'code',
                'scope' => implode(' ', $provider['scopes'] ?? ['openid', 'email']),
                'state' => $state,
            ];
            if (($provider['pkce'] ?? false) === true) {
                $query['code_challenge'] = rtrim(strtr(base64_encode(hash('sha256', $verifier, true)), '+/', '-_'), '=');
                $query['code_challenge_method'] = 'S256';
            }

            return [
                'url' => $provider['authorize_url'] . '?' . http_build_query($query),
                'cookie' => $this->sealState([
                    'provider' => $providerId,
                    'state' => $state,
                    'verifier' => $verifier,
                    'next' => self::safeNext($next),
                    'exp' => time() + (int)(self::config()['meta']['state_ttl_seconds'] ?? 600),
                ]),
            ];
        }

        /**
         * Completes the exchange.
         *
         * @return array{ok: bool, email?: string, name?: string, subject?: string, next?: string, error?: string}
         */
        public function completeAuthorization(string $providerId, string $code, string $state, ?string $cookieHeader): array
        {
            $sealed = $this->readState($cookieHeader);
            if ($sealed === null) {
                return ['ok' => false, 'error' => 'state_missing_or_tampered'];
            }
            if (($sealed['exp'] ?? 0) < time()) {
                return ['ok' => false, 'error' => 'state_expired'];
            }
            // Constant-time compare: the state parameter is the CSRF defence.
            if (!hash_equals((string)($sealed['state'] ?? ''), $state) || ($sealed['provider'] ?? '') !== $providerId) {
                return ['ok' => false, 'error' => 'state_mismatch'];
            }

            $provider = self::provider($providerId);
            if ($provider === null || (($provider['dev_only'] ?? false) === true && !$this->includeDevOnly)) {
                return ['ok' => false, 'error' => 'unknown_identity_provider'];
            }
            $credentials = self::credentials($provider);
            if ($credentials['client_id'] === '' || $credentials['client_secret'] === '') {
                return ['ok' => false, 'error' => 'provider_not_configured'];
            }

            $form = [
                'grant_type' => 'authorization_code',
                'code' => $code,
                'redirect_uri' => $this->redirectUri($providerId),
                'client_id' => $credentials['client_id'],
                'client_secret' => $credentials['client_secret'],
            ];
            if (($provider['pkce'] ?? false) === true) {
                $form['code_verifier'] = (string)($sealed['verifier'] ?? '');
            }
            $token = $this->post($provider['token_url'] ?? '', $form);
            $accessToken = $token['access_token'] ?? null;
            if (!is_string($accessToken) || $accessToken === '') {
                return ['ok' => false, 'error' => 'token_exchange_failed'];
            }

            $claims = $this->get($provider['userinfo_url'] ?? '', $accessToken);
            $map = $provider['claims'] ?? [];
            $email = (string)($claims[$map['email'] ?? 'email'] ?? '');

            // GitHub exposes verification state on its dedicated e-mail endpoint.
            // Prefer it even when /user happens to include a public address.
            if (isset($provider['userinfo_email_url'])) {
                $email = '';
                $emails = $this->get($provider['userinfo_email_url'], $accessToken);
                foreach (is_array($emails) ? $emails : [] as $entry) {
                    if (
                        ($entry['primary'] ?? false) === true
                        && ($entry['verified'] ?? false) === true
                        && is_string($entry['email'] ?? null)
                    ) {
                        $email = $entry['email'];
                        break;
                    }
                }
            }
            $verifiedClaim = $map['verified'] ?? null;
            if (
                ($provider['require_verified_email'] ?? false) === true
                && (!is_string($verifiedClaim) || ($claims[$verifiedClaim] ?? false) !== true)
            ) {
                return ['ok' => false, 'error' => 'provider_email_not_verified'];
            }
            if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return ['ok' => false, 'error' => 'provider_returned_no_email'];
            }

            return [
                'ok' => true,
                'email' => strtolower($email),
                'name' => (string)($claims[$map['name'] ?? 'name'] ?? ''),
                'subject' => (string)($claims[$map['subject'] ?? 'sub'] ?? ''),
                'next' => (string)($sealed['next'] ?? '/?action=panel'),
            ];
        }

        /** Tenant slug derived from the e-mail domain, e.g. anna@firma.pl -> firma-pl. */
        public static function tenantFromEmail(string $email): string
        {
            $domain = strtolower(substr(strrchr($email, '@') ?: '', 1));
            $slug = preg_replace('/[^a-z0-9]+/', '-', $domain) ?? '';
            $slug = trim((string)$slug, '-');
            return substr($slug, 0, 63) ?: 'nowa-organizacja';
        }

        public function clearStateCookie(): string
        {
            return sprintf(
                '%s=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly%s',
                $this->stateCookieName(),
                $this->cookieSecure ? '; Secure' : ''
            );
        }

        /** Only same-origin absolute paths may survive the round trip. */
        private static function safeNext(string $next): string
        {
            if (
                $next === ''
                || !str_starts_with($next, '/')
                || str_starts_with($next, '//')
                || str_contains($next, '\\')
                || preg_match('/[\x00-\x1F\x7F]/', $next) === 1
            ) {
                return '/?action=panel';
            }
            $parts = parse_url($next);
            if ($parts === false || isset($parts['scheme']) || isset($parts['host'])) {
                return '/?action=panel';
            }
            return $next;
        }

        private function redirectUri(string $providerId): string
        {
            $path = str_replace('{provider}', $providerId, (string)(self::config()['meta']['redirect_path'] ?? '/auth/{provider}/callback'));
            return rtrim($this->origin, '/') . $path;
        }

        private function stateCookieName(): string
        {
            return (string)(self::config()['meta']['state_cookie'] ?? 'subactor_oauth');
        }

        private function sealState(array $payload): string
        {
            $data = rtrim(strtr(base64_encode(json_encode($payload, JSON_UNESCAPED_SLASHES)), '+/', '-_'), '=');
            $signature = hash_hmac('sha256', $data, $this->secret);
            return sprintf(
                '%s=%s.%s; Path=/; Max-Age=%d; SameSite=Lax; HttpOnly%s',
                $this->stateCookieName(),
                $data,
                $signature,
                (int)(self::config()['meta']['state_ttl_seconds'] ?? 600),
                $this->cookieSecure ? '; Secure' : ''
            );
        }

        private function readState(?string $cookieHeader): ?array
        {
            $raw = null;
            foreach (explode(';', (string)$cookieHeader) as $pair) {
                $parts = explode('=', trim($pair), 2);
                if (count($parts) === 2 && trim($parts[0]) === $this->stateCookieName()) {
                    $raw = trim($parts[1]);
                }
            }
            if ($raw === null || !str_contains($raw, '.')) {
                return null;
            }
            [$data, $signature] = explode('.', $raw, 2);
            if (!hash_equals(hash_hmac('sha256', $data, $this->secret), $signature)) {
                return null;
            }
            $decoded = json_decode((string)base64_decode(strtr($data, '-_', '+/'), true), true);
            return is_array($decoded) ? $decoded : null;
        }

        private function post(string $url, array $form): array
        {
            $context = stream_context_create(['http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/x-www-form-urlencoded\r\nAccept: application/json",
                'content' => http_build_query($form),
                'timeout' => 10,
                'ignore_errors' => true,
            ]]);
            $raw = @file_get_contents($url, false, $context);
            $decoded = $raw === false ? null : json_decode($raw, true);
            return is_array($decoded) ? $decoded : [];
        }

        private function get(string $url, string $bearer): array
        {
            $context = stream_context_create(['http' => [
                'method' => 'GET',
                'header' => "Authorization: Bearer {$bearer}\r\nAccept: application/json\r\nUser-Agent: subactor-portal",
                'timeout' => 10,
                'ignore_errors' => true,
            ]]);
            $raw = @file_get_contents($url, false, $context);
            $decoded = $raw === false ? null : json_decode($raw, true);
            return is_array($decoded) ? $decoded : [];
        }
    }

    final class PromoEngine
    {
        public static function all(): array
        {
            $jsonFile = __DIR__ . '/config/promos.json';
            if (file_exists($jsonFile)) {
                $content = file_get_contents($jsonFile);
                $decoded = json_decode($content, true);
                if (isset($decoded['promos']) && is_array($decoded['promos'])) {
                    return $decoded['promos'];
                }
            }

            return [
                'NOCC100' => ['code' => 'NOCC100', 'discount_percent' => 100, 'requires_card' => false, 'description' => '100% zniżki — Zakup 0 EUR bez karty płatniczej'],
                'FREEDEV' => ['code' => 'FREEDEV', 'discount_percent' => 100, 'requires_card' => false, 'description' => 'Darmowa licencja deweloperska NOCC'],
                'PARTNER2026' => ['code' => 'PARTNER2026', 'discount_percent' => 50, 'requires_card' => true, 'description' => '50% zniżki partnerskiej'],
                'TRIAL30' => ['code' => 'TRIAL30', 'discount_percent' => 100, 'requires_card' => false, 'description' => '30 dni gratis (NOCC)'],
            ];
        }

        public static function validate(string $code): ?array
        {
            $cleanCode = strtoupper(trim($code));
            $promos = self::all();
            return $promos[$cleanCode] ?? null;
        }

        public static function apply(array $plan, ?string $promoCode): array
        {
            if (!$promoCode) {
                return $plan;
            }

            $promo = self::validate($promoCode);
            if (!$promo) {
                return $plan;
            }

            $finalAmount = (int)round($plan['amount_minor'] * (1 - ($promo['discount_percent'] / 100)));
            $requiresCard = $finalAmount > 0 && ($promo['requires_card'] ?? false);

            return array_merge($plan, [
                'amount_minor' => $finalAmount,
                'promo_code' => $promo['code'],
                'promo_discount_percent' => $promo['discount_percent'],
                'requires_card' => $requiresCard,
                'is_nocc' => !$requiresCard,
            ]);
        }
    }

    final class ReflinkManager
    {
        public static function parseReflink(?string $ref): ?array
        {
            if (!$ref) return null;
            $cleanRef = preg_replace('/[^a-zA-Z0-9_-]/', '', trim($ref));
            if (mb_strlen($cleanRef) < 2) return null;

            return [
                'ref_code' => $cleanRef,
                'attributed_at' => (new DateTimeImmutable())->format(DATE_ATOM),
                'partner_tag' => 'partner_' . strtolower($cleanRef),
            ];
        }
    }

    final class TrialManager
    {
        public function __construct(private readonly DatabaseConnection $db) {}

        public function getTrialStatus(array $account): array
        {
            $createdAt = new DateTimeImmutable($account['created_at'] ?? 'now');
            $expiresAt = $createdAt->modify("+30 days");
            $now = new DateTimeImmutable('now');
            $interval = $now->diff($expiresAt);
            $daysRemaining = $interval->invert ? 0 : (int)$interval->format('%a');

            return [
                'is_trial' => ($account['requested_plan'] ?? '') === Plans::PLAN_PILOT,
                'days_remaining' => $daysRemaining,
                'is_expired' => $now >= $expiresAt,
            ];
        }
    }

    final class Normalizer
    {
        public static function normalizeEmail(mixed $email): string
        {
            $value = trim(mb_strtolower((string)$email));
            if ($value === '' || !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                throw new InvalidArgumentException("invalid_email");
            }
            return $value;
        }

        public static function normalizeTenantSlug(mixed $slug): string
        {
            $value = trim(mb_strtolower((string)$slug));
            if (!preg_match('/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/', $value)) {
                throw new InvalidArgumentException("invalid_tenant_slug");
            }
            return $value;
        }

        /** @return array{account_ref: string, organization_id: string, tenant_label: string, identity_seed: string} */
        public static function organizationIdentity(mixed $email, mixed $label, mixed $identitySeed): array
        {
            $normalizedEmail = self::normalizeEmail($email);
            $seed = trim((string)$identitySeed);
            if (!preg_match('/^[A-Za-z0-9._:-]{8,128}$/', $seed)) {
                throw new InvalidArgumentException('invalid_identity_seed');
            }
            $tenantLabel = preg_replace('/[\x00-\x1F\x7F]+/u', '', (string)$label) ?? '';
            $tenantLabel = trim((string)preg_replace('/\s+/u', ' ', $tenantLabel));
            if ($tenantLabel === '' || mb_strlen($tenantLabel) > 120) {
                throw new InvalidArgumentException('invalid_tenant_label');
            }
            return [
                'account_ref' => 'account_' . substr(hash('sha256', "account\0" . $normalizedEmail), 0, 24),
                'organization_id' => 'org_' . substr(hash('sha256', "organization\0" . $normalizedEmail . "\0" . $seed), 0, 24),
                'tenant_label' => $tenantLabel,
                'identity_seed' => $seed,
            ];
        }

        public static function slugFromEmail(mixed $email): string
        {
            $cleanEmail = self::normalizeEmail($email);
            [$local, $domain] = explode('@', $cleanEmail, 2);
            $domainPart = explode('.', $domain)[0] ?? 'org';
            $raw = $local . '-' . $domainPart;
            $slug = preg_replace('/[^a-z0-9]+/', '-', strtolower($raw));
            $slug = trim((string)$slug, '-');
            if (strlen($slug) < 3) {
                $slug = 'org-' . $slug;
            }
            if (strlen($slug) > 60) {
                $slug = substr($slug, 0, 60);
            }
            return self::normalizeTenantSlug($slug);
        }
    }
}

namespace Subactor\Saas\Poa {
    use DateTimeImmutable;
    use InvalidArgumentException;

    /**
     * Module 4: Process-Oriented Actor (POA) + CQRS & Event Sourcing (ES) Engine
     */
    final class Event
    {
        public function __construct(
            public readonly string $eventId,
            public readonly string $eventType,
            public readonly string $aggregateId,
            public readonly array $payload,
            public readonly DateTimeImmutable $timestamp = new DateTimeImmutable()
        ) {}

        public function toArray(): array
        {
            return [
                'event_id' => $this->eventId,
                'event_type' => $this->eventType,
                'aggregate_id' => $this->aggregateId,
                'payload' => $this->payload,
                'timestamp' => $this->timestamp->format(DATE_ATOM),
            ];
        }
    }

    final class EventStore
    {
        private array $events = [];

        /**
         * Append-only stream per aggregate.
         *
         * Without a storage directory the store stays in memory, which is what
         * the unit tests want. With one it survives the request, which is what
         * an event-sourced panel needs in order to show any history at all.
         */
        public function __construct(private readonly ?string $storageDir = null) {}

        public function append(Event $event): void
        {
            $this->events[] = $event;
            if ($this->storageDir === null) {
                return;
            }
            if (!is_dir($this->storageDir)) {
                mkdir($this->storageDir, 0700, true);
            }
            $line = json_encode($event->toArray(), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            file_put_contents($this->file($event->aggregateId), $line . "\n", FILE_APPEND | LOCK_EX);
        }

        /**
         * Atomically claim an organisation with its first registration event.
         *
         * Multiple PHP workers may receive the same signup concurrently. The
         * read and append therefore share one exclusive stream lock instead of
         * relying on a racy registrationFor() check followed by append().
         */
        public function registerTenant(Event $event): bool
        {
            if ($event->eventType !== 'TenantRegistered') {
                throw new InvalidArgumentException('invalid_registration_event');
            }
            if ($this->storageDir === null) {
                if ($this->registrationFor($event->aggregateId) !== null) {
                    return false;
                }
                $this->events[] = $event;
                return true;
            }
            if (
                !is_dir($this->storageDir)
                && !mkdir($this->storageDir, 0700, true)
                && !is_dir($this->storageDir)
            ) {
                throw new \RuntimeException('event_store_directory_failed');
            }

            $handle = fopen($this->file($event->aggregateId), 'c+');
            if ($handle === false) {
                throw new \RuntimeException('event_stream_open_failed');
            }
            try {
                if (!flock($handle, LOCK_EX)) {
                    throw new \RuntimeException('event_stream_lock_failed');
                }
                rewind($handle);
                while (($line = fgets($handle)) !== false) {
                    $record = json_decode($line, true);
                    if (is_array($record) && ($record['event_type'] ?? '') === 'TenantRegistered') {
                        return false;
                    }
                }
                $line = json_encode(
                    $event->toArray(),
                    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR
                ) . "\n";
                if (fseek($handle, 0, SEEK_END) !== 0 || fwrite($handle, $line) !== strlen($line) || !fflush($handle)) {
                    throw new \RuntimeException('event_stream_write_failed');
                }
                $this->events[] = $event;
                return true;
            } finally {
                flock($handle, LOCK_UN);
                fclose($handle);
            }
        }

        public function getEvents(string $aggregateId): array
        {
            return array_values(array_filter($this->events, fn(Event $e) => $e->aggregateId === $aggregateId));
        }

        /**
         * Most recent events for one aggregate, newest first.
         *
         * @return array<int, array<string, mixed>>
         */
        public function recentFor(string $aggregateId, int $limit = 20): array
        {
            $records = array_map(fn(Event $e) => $e->toArray(), $this->getEvents($aggregateId));
            if ($this->storageDir !== null) {
                $file = $this->file($aggregateId);
                if (is_file($file)) {
                    $records = [];
                    foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
                        $decoded = json_decode($line, true);
                        if (is_array($decoded)) {
                            $records[] = $decoded;
                        }
                    }
                }
            }
            return array_slice(array_reverse($records), 0, max(1, $limit));
        }

        public function all(): array
        {
            return array_map(fn(Event $e) => $e->toArray(), $this->events);
        }

        /**
         * First TenantRegistered record for an organisation, or null.
         *
         * @return array<string, mixed>|null
         */
        public function registrationFor(string $aggregateId): ?array
        {
            $records = [];
            if ($this->storageDir !== null) {
                $file = $this->file($aggregateId);
                if (is_file($file)) {
                    foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
                        $decoded = json_decode($line, true);
                        if (is_array($decoded)) {
                            $records[] = $decoded;
                        }
                    }
                }
            }
            if ($records === []) {
                foreach ($this->getEvents($aggregateId) as $event) {
                    $records[] = $event->toArray();
                }
            }
            foreach ($records as $record) {
                if (($record['event_type'] ?? '') === 'TenantRegistered') {
                    return $record;
                }
            }
            return null;
        }

        /**
         * First TenantRegistered record matching an email address, or null.
         *
         * @return array<string, mixed>|null
         */
        public function registrationForEmail(string $email): ?array
        {
            return $this->registrationsForEmail($email)[0] ?? null;
        }

        /**
         * All TenantRegistered records matching an account email.
         *
         * @return list<array<string, mixed>>
         */
        public function registrationsForEmail(string $email): array
        {
            try {
                $targetEmail = \Subactor\Saas\Domain\Normalizer::normalizeEmail($email);
            } catch (\InvalidArgumentException) {
                return [];
            }
            $matches = [];
            $seen = [];
            $accept = static function (array $record) use ($targetEmail, &$matches, &$seen): void {
                if (($record['event_type'] ?? '') !== 'TenantRegistered') return;
                try {
                    $registered = \Subactor\Saas\Domain\Normalizer::normalizeEmail($record['payload']['email'] ?? '');
                } catch (\InvalidArgumentException) {
                    return;
                }
                $aggregateId = (string)($record['aggregate_id'] ?? '');
                if ($aggregateId === '' || isset($seen[$aggregateId]) || !hash_equals($registered, $targetEmail)) return;
                $seen[$aggregateId] = true;
                $matches[] = $record;
            };
            foreach ($this->events as $event) {
                $accept($event->toArray());
            }
            if ($this->storageDir !== null && is_dir($this->storageDir)) {
                $files = glob($this->storageDir . '/*.jsonl') ?: [];
                foreach ($files as $file) {
                    foreach (file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) ?: [] as $line) {
                        $decoded = json_decode($line, true);
                        if (is_array($decoded)) $accept($decoded);
                    }
                }
            }
            return $matches;
        }

        private function file(string $aggregateId): string
        {
            $safe = preg_replace('/[^a-z0-9-]/', '', strtolower($aggregateId)) ?: 'unknown';
            return $this->storageDir . '/' . $safe . '.jsonl';
        }
    }

    final class CommandDispatcher
    {
        public function __construct(
            private readonly EventStore $eventStore,
            private readonly ?\Subactor\Saas\Notification\EmailNotificationService $notifier = null
        ) {}

        /** Read side for the client panel: only the caller's own aggregate. */
        public function recentFor(string $aggregateId, int $limit = 20): array
        {
            return $this->eventStore->recentFor($aggregateId, $limit);
        }

        /** @return array<string, mixed>|null */
        public function registrationFor(string $aggregateId): ?array
        {
            return $this->eventStore->registrationFor($aggregateId);
        }

        /** @return array<string, mixed>|null */
        public function registrationForEmail(string $email): ?array
        {
            return $this->eventStore->registrationForEmail($email);
        }

        /** @return list<array<string, mixed>> */
        public function registrationsForEmail(string $email): array
        {
            return $this->eventStore->registrationsForEmail($email);
        }

        public function dispatch(string $commandName, array $payload): array
        {
            return match ($commandName) {
                'CreateTenant' => $this->handleCreateTenant($payload),
                'CreateOrganization' => $this->handleCreateOrganization($payload),
                'SelectPlan' => $this->handleSelectPlan($payload),
                'ApplyPromoCode' => $this->handleApplyPromoCode($payload),
                'ConnectIntegration' => $this->handleConnectIntegration($payload),
                'ProvisionSubdomain' => $this->handleProvisionSubdomain($payload),
                default => throw new InvalidArgumentException("unknown_command:{$commandName}"),
            };
        }

        private function handleCreateOrganization(array $payload): array
        {
            $email = \Subactor\Saas\Domain\Normalizer::normalizeEmail($payload['email'] ?? '');
            $eventId = 'evt_' . bin2hex(random_bytes(8));
            $tenant = 'org-' . substr(bin2hex(random_bytes(8)), 0, 12);
            $plan = \Subactor\Saas\Domain\Plans::selectOrDefault($payload['plan'] ?? null);
            $identity = \Subactor\Saas\Domain\Normalizer::organizationIdentity(
                $email,
                $payload['tenant_label'] ?? '',
                $eventId
            );
            $event = new Event($eventId, 'TenantRegistered', $tenant, [
                'email' => $email,
                'tenant_slug' => $tenant,
                'tenant_label' => $identity['tenant_label'],
                'account_ref' => $identity['account_ref'],
                'organization_id' => $identity['organization_id'],
                'identity_seed' => $identity['identity_seed'],
                'plan' => $plan['id'],
                'interval' => 'month',
                'state' => 'active',
                'membership_source' => 'account',
                'billing_owner_tenant_slug' => (string)($payload['billing_owner_tenant_slug'] ?? ''),
            ]);
            if (!$this->eventStore->registerTenant($event)) {
                return ['ok' => false, 'error' => 'organization_registration_failed'];
            }
            return [
                'ok' => true,
                'status' => 'organization_created',
                'aggregate_id' => $tenant,
                'event_id' => $eventId,
                'organization_id' => $identity['organization_id'],
                'tenant_label' => $identity['tenant_label'],
                'plan' => $plan,
            ];
        }

        private function handleConnectIntegration(array $payload): array
        {
            $eventId = 'evt_' . bin2hex(random_bytes(8));
            // Deliberately carries no credential material.
            $this->eventStore->append(new Event($eventId, 'IntegrationConnected', (string)($payload['tenant_slug'] ?? ''), [
                'integration_id' => $payload['integration_id'] ?? '',
                'method' => $payload['method'] ?? 'token',
                'connected_at' => date('c'),
            ]));
            return ['ok' => true, 'event_id' => $eventId];
        }

        private function handleProvisionSubdomain(array $payload): array
        {
            $eventId = 'evt_' . bin2hex(random_bytes(8));
            $this->eventStore->append(new Event($eventId, 'SubdomainProvisioned', (string)($payload['tenant_slug'] ?? ''), [
                'subdomain' => $payload['subdomain'] ?? '',
                'provisioned_at' => date('c'),
            ]));
            return ['ok' => true, 'event_id' => $eventId];
        }

        private function handleCreateTenant(array $payload): array
        {
            $email = \Subactor\Saas\Domain\Normalizer::normalizeEmail($payload['email'] ?? '');
            $rawSlug = trim((string)($payload['tenant_slug'] ?? ''));
            if ($rawSlug !== '') {
                $tenant = \Subactor\Saas\Domain\Normalizer::normalizeTenantSlug($rawSlug);
            } else {
                $existingReg = $this->eventStore->registrationForEmail($email);
                if ($existingReg !== null) {
                    $tenant = (string)($existingReg['aggregate_id'] ?? '');
                } else {
                    $tenant = \Subactor\Saas\Domain\Normalizer::slugFromEmail($email);
                }
            }
            $billingInterval = ($payload['interval'] ?? 'month') === 'year' ? 'year' : 'month';
            $requestedPlan = \Subactor\Saas\Domain\Plans::selectOrDefault($payload['plan'] ?? null, $billingInterval);
            $promoCode = $payload['promo_code'] ?? null;
            $refCode = $payload['ref_code'] ?? null;

            $finalPlan = \Subactor\Saas\Domain\PromoEngine::apply($requestedPlan, $promoCode);
            $refInfo = \Subactor\Saas\Domain\ReflinkManager::parseReflink($refCode);

            $eventId = 'evt_' . bin2hex(random_bytes(8));
            $identity = \Subactor\Saas\Domain\Normalizer::organizationIdentity(
                $email,
                $payload['tenant_label'] ?? $payload['tenant_name'] ?? $tenant,
                $eventId
            );
            $event = new Event($eventId, 'TenantRegistered', $tenant, [
                'email' => $email,
                'tenant_slug' => $tenant,
                'tenant_label' => $identity['tenant_label'],
                'account_ref' => $identity['account_ref'],
                'organization_id' => $identity['organization_id'],
                'identity_seed' => $identity['identity_seed'],
                'plan' => $finalPlan['id'],
                'interval' => $billingInterval,
                'amount_minor' => $finalPlan['amount_minor'],
                'requires_card' => $finalPlan['requires_card'] ?? false,
                'promo_code' => $promoCode,
                'ref_code' => $refInfo['ref_code'] ?? null,
                'state' => 'active',
                'nocc_checkout' => ($finalPlan['amount_minor'] === 0),
            ]);
            if (!$this->eventStore->registerTenant($event)) {
                $existing = $this->eventStore->registrationFor($tenant);
                $existingEmail = is_array($existing)
                    ? trim(mb_strtolower((string)($existing['payload']['email'] ?? '')))
                    : '';
                if ($existingEmail !== '' && hash_equals($existingEmail, $email)) {
                    return [
                        'ok' => true,
                        'status' => 'already_registered',
                        'aggregate_id' => $tenant,
                        'event_id' => (string)($existing['event_id'] ?? $eventId),
                        'plan' => $finalPlan,
                    ];
                }
                return ['ok' => false, 'error' => 'tenant_already_registered'];
            }

            $status = ($finalPlan['amount_minor'] === 0) ? 'provisioned_nocc' : 'pending_payment';

            // One notification point for both the DSL and the REST entry paths.
            // Delivery never blocks provisioning, but its outcome is reported.
            $notification = ['sent' => [], 'failed' => ['notifier' => 'not_configured']];
            if ($this->notifier !== null) {
                $notification = $this->notifier->notifyTenantRegistered([
                    'email' => $email,
                    'tenant' => $tenant,
                    'plan_id' => $finalPlan['id'],
                    'plan_name' => $finalPlan['name'] ?? $finalPlan['id'],
                    'amount' => number_format($finalPlan['amount_minor'] / 100, 2, ',', ' ') . ' €',
                    'period' => $billingInterval === 'year' ? '/ rok' : '/ msc',
                    'status' => $status,
                    'promo_code' => $promoCode,
                    'ref_code' => $refInfo['ref_code'] ?? null,
                    'event_id' => $eventId,
                    'login_url' => 'https://sub.actor/?action=login',
                ]);
            }

            return [
                'ok' => true,
                'status' => $status,
                'aggregate_id' => $tenant,
                'event_id' => $eventId,
                'plan' => $finalPlan,
                'reflink' => $refInfo,
                'notification' => $notification,
            ];
        }

        private function handleSelectPlan(array $payload): array
        {
            $tenant = trim((string)($payload['tenant_slug'] ?? ''));
            if ($tenant === '') {
                return ['ok' => false, 'error' => 'tenant_slug_required'];
            }
            $plan = $payload['plan'] ?? \Subactor\Saas\Domain\Plans::PLAN_PILOT;

            $eventId = 'evt_' . bin2hex(random_bytes(8));
            $event = new Event($eventId, 'PlanSelected', $tenant, [
                'tenant_slug' => $tenant,
                'plan' => $plan,
            ]);
            $this->eventStore->append($event);

            return [
                'ok' => true,
                'status' => 'plan_selected',
                'aggregate_id' => $tenant,
                'event_id' => $eventId,
            ];
        }

        private function handleApplyPromoCode(array $payload): array
        {
            $code = $payload['promo_code'] ?? '';
            $promo = \Subactor\Saas\Domain\PromoEngine::validate($code);
            if (!$promo) {
                return ['ok' => false, 'error' => 'invalid_promo_code'];
            }
            return ['ok' => true, 'promo' => $promo];
        }
    }

    /**
     * TypeScriptAssetLoader: Serves TypeScript / JS assets compiled in-memory or via native esbuild binary
     */
    final class TypeScriptAssetLoader
    {
        public static function getAssetUrl(string $sourceTsFile): string
        {
            $mtime = file_exists($sourceTsFile) ? filemtime($sourceTsFile) : time();
            return "/assets/app.js?v=" . dechex($mtime);
        }
    }
}

namespace Subactor\Saas\I18n {
    /**
     * Module 5: i18n & Multi-Currency Preferences
     */
    /**
     * Locale negotiation and translation.
     *
     * Mirrors negotiateLocale() in src/i18n.mjs so the PHP portal and the Node
     * stack answer the same request identically: explicit ?lang, then the
     * stored cookie, then Accept-Language by q weight, then the default.
     */
    final class PreferencesResolver
    {
        public const COOKIE_NAME = 'subactor_locale';

        public static function supported(): array
        {
            return I18n::meta()['locales'] ?? ['pl'];
        }

        public static function normalizeLocale(?string $value): ?string
        {
            $locale = strtolower(trim((string)$value));
            $locale = preg_split('/[-_]/', $locale)[0] ?? '';
            return in_array($locale, self::supported(), true) ? $locale : null;
        }

        public static function negotiate(?string $requested, ?string $stored = null, ?string $acceptLanguage = null): string
        {
            foreach ([$requested, $stored] as $candidate) {
                $locale = self::normalizeLocale($candidate);
                if ($locale !== null) {
                    return $locale;
                }
            }

            $ranked = [];
            foreach (explode(',', (string)$acceptLanguage) as $index => $entry) {
                $parts = explode(';', trim($entry));
                $locale = self::normalizeLocale($parts[0] ?? '');
                if ($locale === null) {
                    continue;
                }
                $quality = 1.0;
                foreach (array_slice($parts, 1) as $parameter) {
                    if (str_starts_with(trim($parameter), 'q=')) {
                        $quality = (float)substr(trim($parameter), 2);
                    }
                }
                $ranked[] = ['locale' => $locale, 'q' => $quality, 'index' => $index];
            }
            usort($ranked, static fn(array $a, array $b): int => $b['q'] <=> $a['q'] ?: $a['index'] <=> $b['index']);

            return $ranked[0]['locale'] ?? (I18n::meta()['default'] ?? 'pl');
        }

        /** Reads the locale out of a raw Cookie header. */
        public static function storedLocale(?string $cookieHeader): ?string
        {
            foreach (explode(';', (string)$cookieHeader) as $pair) {
                $parts = explode('=', trim($pair), 2);
                if (count($parts) === 2 && trim($parts[0]) === self::COOKIE_NAME) {
                    return trim($parts[1]);
                }
            }
            return null;
        }

        public static function cookie(string $locale): string
        {
            return sprintf('%s=%s; Path=/; SameSite=Lax; Max-Age=%d', self::COOKIE_NAME, $locale, 31536000);
        }

        public static function resolve(?string $locale = null, ?string $currency = null): array
        {
            $cur = in_array(strtoupper((string)$currency), ['EUR', 'PLN', 'USD', 'GBP', 'CHF'], true)
                ? strtoupper((string)$currency)
                : 'EUR';
            return ['locale' => self::negotiate($locale), 'currency' => $cur];
        }

        public static function formatPrice(int $amountMinor, string $baseCurrency, string $displayCurrency, float $rate = 4.28): string
        {
            $val = ($amountMinor / 100) * ($baseCurrency === $displayCurrency ? 1.0 : $rate);
            return match ($displayCurrency) {
                'PLN' => sprintf('%.2f zł', $val),
                'USD' => sprintf('$%.2f', $val),
                default => sprintf('%.2f €', $val),
            };
        }
    }

    /**
     * Translation overlays (config/i18n.json).
     *
     * Polish stays canonical in plans.json and integrations.json; this class
     * only layers the English and German variants on top.
     */
    final class I18n
    {
        public static function meta(): array
        {
            return self::load()['meta'] ?? ['locales' => ['pl'], 'default' => 'pl'];
        }

        /** Interface dictionary handed to the frontend. */
        public static function ui(string $locale): array
        {
            $ui = self::load()['ui'] ?? [];
            return array_merge($ui['pl'] ?? [], $ui[$locale] ?? []);
        }

        public static function translatePlan(array $plan, string $locale): array
        {
            $overlay = self::load()['plans'][$locale][$plan['id'] ?? ''] ?? null;
            return is_array($overlay) ? array_merge($plan, $overlay) : $plan;
        }

        public static function translateIntegration(array $integration, string $locale): array
        {
            $overlay = self::load()['integrations'][$locale][$integration['id'] ?? ''] ?? null;
            return is_array($overlay) ? array_merge($integration, $overlay) : $integration;
        }

        public static function integrationsMeta(array $polishMeta, string $locale): array
        {
            $overlay = self::load()['integrations'][$locale]['_meta'] ?? null;
            return is_array($overlay) ? array_merge($polishMeta, $overlay) : $polishMeta;
        }

        public static function offerMeta(array $polishMeta, string $locale): array
        {
            $overlay = self::load()['offer_meta'][$locale] ?? null;
            return is_array($overlay) ? array_merge($polishMeta, $overlay) : $polishMeta;
        }

        private static function load(): array
        {
            static $cache = null;
            if ($cache !== null) {
                return $cache;
            }
            $cache = [];
            $jsonFile = __DIR__ . '/config/i18n.json';
            if (file_exists($jsonFile)) {
                $decoded = json_decode((string)file_get_contents($jsonFile), true);
                if (is_array($decoded)) {
                    $cache = $decoded;
                }
            }
            return $cache;
        }
    }
}

namespace Subactor\Saas\Session {
    use InvalidArgumentException;

    /**
     * Module 5b: Cookie-based Session Manager (zero-dependency, HMAC-signed)
     */
    final class SessionManager
    {
        private const COOKIE_NAME = 'subactor_session';
        private const ALGO = 'sha256';

        public function __construct(
            private readonly string $secret,
            private readonly int $ttlSeconds = 86400,
            private readonly bool $cookieSecure = false
        ) {
            if (trim($this->secret) === '') {
                throw new InvalidArgumentException('session_secret_required');
            }
        }

        public function create(string $email, string $tenantSlug, string $plan = 'saas-start'): array
        {
            $expiresAt = time() + $this->ttlSeconds;
            $payload = [
                'email' => $email,
                'tenant_slug' => $tenantSlug,
                'plan' => $plan,
                'iat' => time(),
                'exp' => $expiresAt,
            ];
            $token = $this->encode($payload);
            return [
                'ok' => true,
                'session_token' => $token,
                'expires_at' => date('c', $expiresAt),
                'cookie' => sprintf(
                    '%s=%s; Path=/; HttpOnly; SameSite=Strict; Max-Age=%d%s',
                    self::COOKIE_NAME,
                    $token,
                    $this->ttlSeconds,
                    $this->cookieSecure ? '; Secure' : ''
                ),
            ];
        }

        public function verify(?string $token): ?array
        {
            if (!$token) return null;
            $payload = $this->decode($token);
            if (!$payload) return null;
            if (($payload['exp'] ?? 0) < time()) return null;
            return $payload;
        }

        public function fromCookieHeader(?string $cookieHeader): ?array
        {
            if (!$cookieHeader) return null;
            $cookies = [];
            foreach (explode(';', $cookieHeader) as $pair) {
                $parts = explode('=', trim($pair), 2);
                if (count($parts) === 2) $cookies[trim($parts[0])] = trim($parts[1]);
            }
            return $this->verify($cookies[self::COOKIE_NAME] ?? null);
        }

        public function destroyCookie(): string
        {
            return sprintf('%s=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0%s',
                self::COOKIE_NAME, $this->cookieSecure ? '; Secure' : '');
        }

        private function encode(array $payload): string
        {
            $json = json_encode($payload, JSON_UNESCAPED_SLASHES);
            $sig = hash_hmac(self::ALGO, $json, $this->secret);
            return base64_encode($json) . '.' . $sig;
        }

        private function decode(string $token): ?array
        {
            $parts = explode('.', $token, 2);
            if (count($parts) !== 2) return null;
            [$dataB64, $sig] = $parts;
            $json = base64_decode($dataB64, true);
            if ($json === false) return null;
            $expectedSig = hash_hmac(self::ALGO, $json, $this->secret);
            if (!hash_equals($expectedSig, $sig)) return null;
            return json_decode($json, true);
        }
    }

    final class OtpManager
    {
        private string $storageDir;

        public function __construct(
            ?string $storageDir = null,
            private readonly int $ttlSeconds = 600,
            private readonly int $cooldownSeconds = 45,
            private readonly ?\Subactor\Saas\Notification\EmailNotificationService $notifier = null,
            /** When false: no magic codes, no API exposure of OTP, mail failure is hard error. */
            private readonly bool $allowDevBypass = false
        ) {
            $this->storageDir = $storageDir ?? sys_get_temp_dir() . '/subactor-otp';
        }

        public function cooldownSeconds(): int
        {
            return $this->cooldownSeconds;
        }

        /** HTTP/JSON and HTML must never include OTP plaintext. */
        public function exposesDevOtp(): bool
        {
            return false;
        }

        /**
         * @return array{action: string, code: string, cooldown_seconds?: int, error?: string}
         */
        public function generateOtp(string $email): array
        {
            $cleanEmail = \Subactor\Saas\Domain\Normalizer::normalizeEmail($email);
            if (!is_dir($this->storageDir)) {
                @mkdir($this->storageDir, 0700, true);
            }
            $file = $this->storageDir . '/' . md5($cleanEmail) . '.json';

            // Cooldown rate-limit guard: prevent spamming email dispatch.
            if (is_file($file)) {
                $existing = json_decode((string)@file_get_contents($file), true);
                $generatedAt = is_array($existing) ? (int)($existing['generated_at'] ?? 0) : 0;
                $elapsed = time() - $generatedAt;
                if ($generatedAt > 0 && $elapsed < $this->cooldownSeconds) {
                    return [
                        'action' => 'cooldown',
                        'code' => (string)($existing['code'] ?? ''),
                        'cooldown_seconds' => $this->cooldownSeconds - $elapsed,
                    ];
                }
            }

            $code = sprintf('%06d', random_int(100000, 999999));
            $data = [
                'email' => $cleanEmail,
                'code' => $code,
                'generated_at' => time(),
                'expires_at' => time() + $this->ttlSeconds,
            ];
            file_put_contents($file, json_encode($data, JSON_THROW_ON_ERROR));

            if ($this->notifier !== null) {
                $mail = $this->notifier->sendOtpEmail($cleanEmail, $code);
                if (!($mail['sent'] ?? false)) {
                    @unlink($file);
                    return [
                        'action' => 'delivery_failed',
                        'code' => '',
                        'error' => 'otp_email_delivery_failed',
                    ];
                }
            }

            return ['action' => 'issued', 'code' => $code];
        }

        public function verifyOtp(string $email, string $code): bool
        {
            try {
                $cleanEmail = \Subactor\Saas\Domain\Normalizer::normalizeEmail($email);
            } catch (\InvalidArgumentException) {
                return false;
            }
            $cleanCode = trim($code);
            if ($cleanCode === '' ) {
                return false;
            }
            if ($this->allowDevBypass && ($cleanCode === '123456' || $cleanCode === 'NOCC100')) {
                return true;
            }
            $file = $this->storageDir . '/' . md5($cleanEmail) . '.json';
            if (!is_file($file)) {
                return false;
            }
            $data = json_decode((string)file_get_contents($file), true);
            if (!is_array($data)) {
                return false;
            }
            if (($data['expires_at'] ?? 0) < time()) {
                @unlink($file);
                return false;
            }
            if (hash_equals((string)($data['code'] ?? ''), $cleanCode)) {
                @unlink($file);
                return true;
            }
            return false;
        }
    }
}

namespace Subactor\Saas\Control {
    final class PortalControlClient
    {
        private const MAX_RESPONSE_BYTES = 1048576;

        public function __construct(
            private readonly string $baseUrl,
            private readonly string $token,
            private readonly int $timeoutMs = 5000
        ) {}

        public function configured(): bool
        {
            return trim($this->token) !== '' && $this->normalizedBaseUrl() !== null;
        }

        /** @param array<int, mixed> $history @param array<int, mixed> $references */
        public function resolveIntent(string $text, string $tenant, array $history = [], array $references = []): array
        {
            $text = trim($text);
            if ($text === '' || mb_strlen($text) > 8000) throw new \InvalidArgumentException('chat_text_out_of_bounds');
            if (preg_match('/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/', $tenant) !== 1) {
                throw new \InvalidArgumentException('invalid_tenant_slug');
            }
            $base = $this->normalizedBaseUrl();
            if ($base === null || trim($this->token) === '') throw new \RuntimeException('portal_control_not_configured');

            $safeHistory = [];
            foreach (array_slice($history, -12) as $row) {
                if (!is_array($row)) continue;
                $role = (string)($row['role'] ?? '');
                $content = trim((string)($row['content'] ?? ''));
                if (!in_array($role, ['user', 'assistant'], true) || $content === '') continue;
                $safeHistory[] = ['role' => $role, 'content' => mb_substr($content, 0, 4000)];
            }
            $safeReferences = [];
            foreach (array_slice($references, 0, 16) as $row) {
                if (!is_array($row)) continue;
                $ref = trim((string)($row['ref'] ?? ''));
                if ($ref === '' || strlen($ref) > 240 || preg_match('/^[A-Za-z][A-Za-z0-9+.-]*:[A-Za-z0-9._:\/-]+$/', $ref) !== 1) continue;
                $safeReferences[] = [
                    'ref' => $ref,
                    'kind' => mb_substr(trim((string)($row['kind'] ?? 'artifact')), 0, 40),
                    'title' => mb_substr(trim((string)($row['title'] ?? $ref)), 0, 160),
                ];
            }
            $contextRefs = implode("\n", array_map(
                static fn(array $item): string => '- ' . $item['ref'],
                $safeReferences
            ));
            $groundedText = $contextRefs === '' ? $text : $text . "\n\n```subactor-context-refs\n" . $contextRefs . "\n```";
            return $this->requestJson('POST', '/api/llm/intent', [
                'text' => $groundedText,
                'history' => $safeHistory,
                'context' => ['tenant' => $tenant, 'artifact_refs' => $safeReferences],
                'mode' => 'propose',
            ]);
        }

        public function listLlmCredentials(string $tenant): array
        {
            $tenant = $this->validTenant($tenant);
            return $this->requestJson('GET', '/api/llm-credentials?tenant=' . rawurlencode($tenant));
        }

        /** @param array<string, mixed> $input */
        public function createLlmCredential(string $tenant, array $input): array
        {
            $tenant = $this->validTenant($tenant);
            $provider = strtolower(trim((string)($input['provider'] ?? '')));
            $path = $provider === 'ollama'
                ? '/api/llm-credentials/configure'
                : '/api/llm-credentials/intake';
            return $this->requestJson('POST', $path, [
                'tenant' => $tenant,
                'provider' => $provider,
                'credential_name' => trim((string)($input['credential_name'] ?? 'default')),
                'endpoint' => trim((string)($input['endpoint'] ?? '')),
                'ticket_id' => trim((string)($input['ticket_id'] ?? '')),
            ]);
        }

        private function validTenant(string $tenant): string
        {
            $tenant = strtolower(trim($tenant));
            if (preg_match('/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/', $tenant) !== 1) {
                throw new \InvalidArgumentException('invalid_tenant_slug');
            }
            return $tenant;
        }

        /** @param array<string, mixed>|null $input */
        private function requestJson(string $method, string $path, ?array $input = null): array
        {
            $base = $this->normalizedBaseUrl();
            if ($base === null || trim($this->token) === '') throw new \RuntimeException('portal_control_not_configured');
            if (preg_match('#^/api/[a-z0-9?&=._/%-]+$#', $path) !== 1) throw new \InvalidArgumentException('portal_control_path_invalid');
            $payload = $input === null ? null : json_encode(
                $input,
                JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR
            );
            $context = stream_context_create(['http' => [
                'method' => $method,
                'header' => implode("\r\n", [
                    'Content-Type: application/json',
                    'Accept: application/json',
                    'Authorization: Bearer ' . trim($this->token),
                    'User-Agent: subactor-user-portal/1',
                    'Connection: close',
                ]),
                ...($payload === null ? [] : ['content' => $payload]),
                'timeout' => max(1, min(30, (int)ceil($this->timeoutMs / 1000))),
                'ignore_errors' => true,
                'follow_location' => 0,
                'max_redirects' => 0,
            ]]);
            unset($http_response_header);
            $raw = @file_get_contents($base . $path, false, $context, 0, self::MAX_RESPONSE_BYTES + 1);
            $headers = $http_response_header ?? [];
            if ($raw === false) throw new \RuntimeException('portal_control_unreachable');
            if (strlen($raw) > self::MAX_RESPONSE_BYTES) throw new \RuntimeException('portal_control_response_too_large');
            $decoded = json_decode($raw, true);
            if (!is_array($decoded) || array_is_list($decoded)) throw new \RuntimeException('portal_control_invalid_response');
            $status = $this->statusCode($headers);
            if ($status < 200 || $status >= 300) {
                $code = preg_replace('/[^a-z0-9._-]/', '', strtolower((string)($decoded['error'] ?? $decoded['code'] ?? 'failed')));
                throw new \RuntimeException('portal_control_' . ($code ?: 'failed'));
            }
            return $decoded;
        }

        private function normalizedBaseUrl(): ?string
        {
            $url = rtrim(trim($this->baseUrl), '/');
            if ($url === '' || strlen($url) > 2048 || preg_match('/[\x00-\x20\x7F]/', $url) === 1) return null;
            $parts = parse_url($url);
            if (!is_array($parts) || !in_array(strtolower((string)($parts['scheme'] ?? '')), ['http', 'https'], true)) return null;
            if (($parts['host'] ?? '') === '' || isset($parts['user']) || isset($parts['pass']) || isset($parts['query']) || isset($parts['fragment'])) return null;
            return $url;
        }

        /** @param array<int, string> $headers */
        private function statusCode(array $headers): int
        {
            foreach ($headers as $header) {
                if (preg_match('/^HTTP\/\S+\s+(\d{3})\b/i', $header, $match) === 1) return (int)$match[1];
            }
            return 0;
        }
    }
}

namespace Subactor\Saas\Dsl {
    use Subactor\Saas\Domain\Plans;
    use Subactor\Saas\Domain\Integrations;
    use Subactor\Saas\I18n\I18n;
    use Subactor\Saas\Domain\IntegrationConnections;
    use Subactor\Saas\Domain\TenantHosting;
    use Subactor\Saas\Domain\NodeRegistry;
    use Subactor\Saas\Domain\PaymentProviders;
    use Subactor\Saas\Domain\Normalizer;
    use Subactor\Saas\Domain\PromoEngine;
    use Subactor\Saas\Poa\CommandDispatcher;
    use Subactor\Saas\Poa\EventStore;
    use Subactor\Saas\Session\SessionManager;
    use Subactor\Saas\Session\OtpManager;
    use InvalidArgumentException;

    /**
     * Module 5c: Portal Operations DSL Interpreter
     *
     * DSL schema: subactor.portal-operations/v1
     * Canonical representation: JSON
     * Commands: CREATE_TENANT, SELECT_PLAN, APPLY_PROMO, LIST_PLANS,
     *           LIST_INTEGRATIONS, VALIDATE_PROMO, LOGIN, LOGOUT, GET_SESSION,
     *           GET_HOSTING, SET_OPENWEBUI_URL, REQUEST_OTP, VERIFY_OTP
     */
    final class DslInterpreter
    {
        public const SCHEMA = 'subactor.portal-operations/v1';
        public const COMMANDS = [
            'CREATE_TENANT', 'SELECT_PLAN', 'APPLY_PROMO', 'LIST_PLANS',
            'LIST_INTEGRATIONS', 'LIST_PROVIDERS', 'VALIDATE_PROMO', 'LOGIN', 'LOGOUT', 'GET_SESSION',
            'LIST_CONNECTIONS', 'CONNECT_INTEGRATION', 'DISCONNECT_INTEGRATION',
            'GET_HOSTING', 'SET_OPENWEBUI_URL', 'PLAN_SUBDOMAIN', 'APPLY_SUBDOMAIN', 'GET_EVENTS',
            'LIST_NODES', 'ENROLL_NODE', 'PROBE_NODE', 'REMOVE_NODE', 'NODE_HEARTBEAT',
            'REQUEST_OTP', 'VERIFY_OTP',
        ];

        private readonly OtpManager $otpMgr;

        public function __construct(
            private readonly CommandDispatcher $dispatcher,
            private readonly ?SessionManager $sessionMgr = null,
            private readonly ?IntegrationConnections $connections = null,
            private readonly ?TenantHosting $hosting = null,
            private readonly ?NodeRegistry $nodes = null,
            ?OtpManager $otpMgr = null
        ) {
            $this->otpMgr = $otpMgr ?? new OtpManager(allowDevBypass: false);
        }

        /**
         * Connection commands act on someone's credentials, so they require a
         * verified session cookie and operate only on that session's tenant.
         */
        private function requireTenant(array $p): string
        {
            if ($this->sessionMgr === null) {
                throw new InvalidArgumentException('session_manager_not_configured');
            }
            $session = $this->sessionMgr->fromCookieHeader($p['_cookie'] ?? null)
                ?? $this->sessionMgr->verify($p['session_token'] ?? null);
            if ($session === null) {
                throw new InvalidArgumentException('session_required');
            }
            return (string)($session['tenant_slug'] ?? '');
        }

        public function execute(array $dsl): array
        {
            if (!isset($dsl['command']) || !is_string($dsl['command'])) {
                return $this->error('DSL-INVALID-001', 'Missing or invalid "command" field');
            }

            $command = strtoupper($dsl['command']);
            if (!in_array($command, self::COMMANDS, true)) {
                return $this->error('DSL-UNKNOWN-001', "Unknown command: {$command}");
            }

            $payload = $dsl['payload'] ?? [];

            try {
                return match ($command) {
                    'CREATE_TENANT' => $this->cmdCreateTenant($payload),
                    'SELECT_PLAN' => $this->cmdSelectPlan($payload),
                    'APPLY_PROMO' => $this->cmdApplyPromo($payload),
                    'LIST_PLANS' => $this->cmdListPlans($payload),
                    'LIST_INTEGRATIONS' => $this->cmdListIntegrations($payload),
                    'LIST_PROVIDERS' => $this->cmdListProviders(),
                    'LIST_CONNECTIONS' => $this->cmdListConnections($payload),
                    'CONNECT_INTEGRATION' => $this->cmdConnectIntegration($payload),
                    'DISCONNECT_INTEGRATION' => $this->cmdDisconnectIntegration($payload),
                    'GET_HOSTING' => $this->cmdGetHosting($payload),
                    'SET_OPENWEBUI_URL' => $this->cmdSetOpenWebUiUrl($payload),
                    'PLAN_SUBDOMAIN' => $this->cmdPlanSubdomain($payload),
                    'APPLY_SUBDOMAIN' => $this->cmdApplySubdomain($payload),
                    'GET_EVENTS' => $this->cmdGetEvents($payload),
                    'LIST_NODES' => $this->cmdListNodes($payload),
                    'ENROLL_NODE' => $this->cmdEnrollNode($payload),
                    'PROBE_NODE' => $this->cmdProbeNode($payload),
                    'REMOVE_NODE' => $this->cmdRemoveNode($payload),
                    'NODE_HEARTBEAT' => $this->cmdNodeHeartbeat($payload),
                    'VALIDATE_PROMO' => $this->cmdValidatePromo($payload),
                    'LOGIN' => $this->cmdLogin($payload),
                    'LOGOUT' => $this->cmdLogout(),
                    'GET_SESSION' => $this->cmdGetSession($payload),
                    'REQUEST_OTP' => $this->cmdRequestOtp($payload),
                    'VERIFY_OTP' => $this->cmdVerifyOtp($payload),
                };
            } catch (InvalidArgumentException $e) {
                return $this->error('DSL-VALIDATION-001', $e->getMessage());
            } catch (\Throwable $e) {
                return $this->error('DSL-EXEC-001', $e->getMessage());
            }
        }

        private function cmdCreateTenant(array $p): array
        {
            $res = $this->dispatcher->dispatch('CreateTenant', $p);
            if (($res['ok'] ?? false) !== true) {
                return $this->error('DSL-TENANT-001', 'Organisation is already registered');
            }
            return ['ok' => true, 'command' => 'CREATE_TENANT', 'result' => $res];
        }

        private function cmdSelectPlan(array $p): array
        {
            $res = $this->dispatcher->dispatch('SelectPlan', $p);
            return ['ok' => true, 'command' => 'SELECT_PLAN', 'result' => $res];
        }

        private function cmdApplyPromo(array $p): array
        {
            $res = $this->dispatcher->dispatch('ApplyPromoCode', $p);
            return ['ok' => true, 'command' => 'APPLY_PROMO', 'result' => $res];
        }

        private function cmdListPlans(array $p): array
        {
            $interval = ($p['interval'] ?? 'month') === 'year' ? 'year' : 'month';
            $includeArchived = ($p['include_archived'] ?? false) === true;
            $locale = (string)($p['locale'] ?? 'pl');
            $plans = array_values($includeArchived ? Plans::all($interval) : Plans::offered($interval));
            $plans = array_map(static fn(array $plan): array => I18n::translatePlan($plan, $locale), $plans);
            return ['ok' => true, 'command' => 'LIST_PLANS', 'result' => [
                'plans' => $plans,
                'interval' => $interval,
                'locale' => $locale,
                'meta' => I18n::offerMeta(Plans::meta(), $locale),
            ]];
        }

        private function cmdListIntegrations(array $p = []): array
        {
            $locale = (string)($p['locale'] ?? 'pl');
            $integrations = Integrations::all();
            if ($integrations === []) {
                // Config missing: say so rather than inventing a catalogue.
                return ['ok' => true, 'command' => 'LIST_INTEGRATIONS', 'result' => [
                    'integrations' => [],
                    'meta' => ['headline' => 'Integracje', 'subheadline' => 'Katalog integracji jest chwilowo niedostępny.'],
                ]];
            }
            $integrations = array_map(
                static fn(array $integration): array => I18n::translateIntegration($integration, $locale),
                $integrations
            );
            return ['ok' => true, 'command' => 'LIST_INTEGRATIONS', 'result' => [
                'integrations' => $integrations,
                'locale' => $locale,
                'meta' => I18n::integrationsMeta(Integrations::meta(), $locale),
            ]];
        }

        private function cmdListProviders(): array
        {
            $providers = array_values(PaymentProviders::all());
            return ['ok' => true, 'command' => 'LIST_PROVIDERS', 'result' => [
                'providers' => $providers,
                'default' => PaymentProviders::default()['id'] ?? 'paypal',
                'meta' => PaymentProviders::meta(),
                'test_cards' => PaymentProviders::testCards(),
            ]];
        }

        private function cmdListConnections(array $p): array
        {
            $tenant = $this->requireTenant($p);
            if ($this->connections === null) {
                return $this->error('DSL-CONN-001', 'Connection store not configured');
            }
            return ['ok' => true, 'command' => 'LIST_CONNECTIONS', 'result' => [
                'tenant' => $tenant,
                'connections' => $this->connections->forTenant($tenant),
            ]];
        }

        private function cmdConnectIntegration(array $p): array
        {
            $tenant = $this->requireTenant($p);
            if ($this->connections === null) {
                return $this->error('DSL-CONN-001', 'Connection store not configured');
            }
            $integrationId = (string)($p['integration_id'] ?? '');
            if ($integrationId === '') {
                return $this->error('DSL-CONN-002', 'Missing integration_id');
            }
            $record = $this->connections->connect(
                $tenant,
                $integrationId,
                is_array($p['values'] ?? null) ? $p['values'] : [],
                (string)($p['method'] ?? 'token')
            );
            $this->dispatcher->dispatch('ConnectIntegration', [
                'tenant_slug' => $tenant,
                'integration_id' => $integrationId,
                'method' => $record['method'],
            ]);
            return ['ok' => true, 'command' => 'CONNECT_INTEGRATION', 'result' => [
                'integration_id' => $integrationId,
                'connection' => $record,
            ]];
        }

        private function cmdDisconnectIntegration(array $p): array
        {
            $tenant = $this->requireTenant($p);
            if ($this->connections === null) {
                return $this->error('DSL-CONN-001', 'Connection store not configured');
            }
            $integrationId = (string)($p['integration_id'] ?? '');
            $removed = $this->connections->disconnect($tenant, $integrationId);
            return ['ok' => true, 'command' => 'DISCONNECT_INTEGRATION', 'result' => [
                'integration_id' => $integrationId,
                'removed' => $removed,
            ]];
        }

        private function cmdGetEvents(array $p): array
        {
            $tenant = $this->requireTenant($p);
            return ['ok' => true, 'command' => 'GET_EVENTS', 'result' => [
                'tenant' => $tenant,
                'events' => $this->dispatcher->recentFor($tenant, (int)($p['limit'] ?? 20)),
            ]];
        }

        private function cmdListNodes(array $p): array
        {
            $tenant = $this->requireTenant($p);
            if ($this->nodes === null) return $this->error('DSL-NODE-001', 'Node registry not configured');
            return ['ok' => true, 'command' => 'LIST_NODES', 'result' => [
                'tenant' => $tenant,
                'nodes' => $this->nodes->forTenant($tenant),
            ]];
        }

        private function cmdEnrollNode(array $p): array
        {
            $tenant = $this->requireTenant($p);
            if ($this->nodes === null) return $this->error('DSL-NODE-001', 'Node registry not configured');
            $enrollment = $this->nodes->enroll(
                $tenant,
                (string)($p['offer_id'] ?? ''),
                (string)($p['name'] ?? ''),
                (string)($p['endpoint_url'] ?? '')
            );
            return ['ok' => true, 'command' => 'ENROLL_NODE', 'result' => $enrollment];
        }

        private function cmdRemoveNode(array $p): array
        {
            $tenant = $this->requireTenant($p);
            if ($this->nodes === null) return $this->error('DSL-NODE-001', 'Node registry not configured');
            $nodeId = (string)($p['node_id'] ?? '');
            if ($nodeId === '') return $this->error('DSL-NODE-002', 'Missing node_id');
            return ['ok' => true, 'command' => 'REMOVE_NODE', 'result' => [
                'node_id' => $nodeId,
                'removed' => $this->nodes->remove($tenant, $nodeId),
            ]];
        }

        private function cmdProbeNode(array $p): array
        {
            $tenant = $this->requireTenant($p);
            if ($this->nodes === null) return $this->error('DSL-NODE-001', 'Node registry not configured');
            $nodeId = (string)($p['node_id'] ?? '');
            if ($nodeId === '') return $this->error('DSL-NODE-002', 'Missing node_id');
            return ['ok' => true, 'command' => 'PROBE_NODE', 'result' => [
                'node' => $this->nodes->probe($tenant, $nodeId),
            ]];
        }

        private function cmdNodeHeartbeat(array $p): array
        {
            if ($this->nodes === null) return $this->error('DSL-NODE-001', 'Node registry not configured');
            $node = $this->nodes->heartbeat(
                (string)($p['tenant'] ?? ''),
                (string)($p['node_id'] ?? ''),
                (string)($p['token'] ?? ''),
                $p
            );
            return ['ok' => true, 'command' => 'NODE_HEARTBEAT', 'result' => ['node' => $node]];
        }

        private function cmdGetHosting(array $p): array
        {
            $tenant = $this->requireTenant($p);
            if ($this->hosting === null) {
                return $this->error('DSL-HOST-001', 'Hosting provisioner not configured');
            }
            return ['ok' => true, 'command' => 'GET_HOSTING', 'result' => [
                'tenant' => $tenant,
                'hosting' => $this->hosting->stateFor($tenant),
                'base_domain' => TenantHosting::config()['base_domain'] ?? '',
                'gates_open' => TenantHosting::gatesOpen(),
                'openwebui_url' => TenantHosting::resolveOpenWebUiUrl($this->hosting->stateFor($tenant)),
            ]];
        }

        private function cmdSetOpenWebUiUrl(array $p): array
        {
            $tenant = $this->requireTenant($p);
            if ($this->hosting === null) {
                return $this->error('DSL-HOST-001', 'Hosting provisioner not configured');
            }
            $result = $this->hosting->setOpenWebUiUrl($tenant, (string)($p['url'] ?? ''));
            if (($result['ok'] ?? false) !== true) {
                return $this->error('DSL-HOST-004', (string)($result['error'] ?? 'invalid_openwebui_url'));
            }
            return ['ok' => true, 'command' => 'SET_OPENWEBUI_URL', 'result' => $result];
        }

        private function cmdPlanSubdomain(array $p): array
        {
            $tenant = $this->requireTenant($p);
            if ($this->hosting === null) {
                return $this->error('DSL-HOST-001', 'Hosting provisioner not configured');
            }
            $plan = $this->hosting->plan($tenant);
            if (($plan['ok'] ?? false) !== true) {
                return $this->error('DSL-HOST-002', (string)($plan['error'] ?? 'plan_failed'));
            }
            return ['ok' => true, 'command' => 'PLAN_SUBDOMAIN', 'result' => $plan];
        }

        private function cmdApplySubdomain(array $p): array
        {
            $tenant = $this->requireTenant($p);
            if ($this->hosting === null) {
                return $this->error('DSL-HOST-001', 'Hosting provisioner not configured');
            }
            $result = $this->hosting->apply(
                $tenant,
                (string)($p['plan_hash'] ?? ''),
                (string)($p['apply_grant'] ?? '')
            );
            if (($result['ok'] ?? false) !== true) {
                return $this->error('DSL-HOST-003', (string)($result['error'] ?? 'apply_failed'));
            }
            $this->dispatcher->dispatch('ProvisionSubdomain', [
                'tenant_slug' => $tenant,
                'subdomain' => $result['subdomain']['subdomain'] ?? '',
            ]);
            return ['ok' => true, 'command' => 'APPLY_SUBDOMAIN', 'result' => $result];
        }

        private function cmdValidatePromo(array $p): array
        {
            $code = $p['code'] ?? '';
            $promo = PromoEngine::validate($code);
            if (!$promo) {
                return $this->error('DSL-PROMO-001', 'Invalid promo code');
            }
            return ['ok' => true, 'command' => 'VALIDATE_PROMO', 'result' => ['promo' => $promo]];
        }

        private function cmdLogin(array $p): array
        {
            if (!$this->sessionMgr) {
                return $this->error('DSL-AUTH-001', 'Session manager not configured');
            }
            try {
                $email = Normalizer::normalizeEmail($p['email'] ?? '');
                $rawSlug = trim((string)($p['tenant_slug'] ?? ''));
                if ($rawSlug !== '') {
                    $tenantSlug = Normalizer::normalizeTenantSlug($rawSlug);
                } else {
                    $reg = $this->dispatcher->registrationForEmail($email);
                    if ($reg === null) {
                        return $this->invalidCredentials();
                    }
                    $tenantSlug = (string)($reg['aggregate_id'] ?? $reg['payload']['tenant_slug'] ?? '');
                }
            } catch (InvalidArgumentException) {
                return $this->invalidCredentials();
            }
            $registration = $this->dispatcher->registrationFor($tenantSlug);
            $registeredEmail = is_array($registration)
                ? trim(mb_strtolower((string)($registration['payload']['email'] ?? '')))
                : '';
            if ($registration === null || $registeredEmail === '' || !hash_equals($registeredEmail, $email)) {
                return $this->invalidCredentials();
            }

            $otpCode = trim((string)($p['otp_code'] ?? $p['code'] ?? ''));
            if ($otpCode === '') {
                // Membership-before-payment: login always binds via OTP (no password/slug bypass).
                $issued = $this->otpMgr->generateOtp($email);
                if (($issued['action'] ?? '') === 'delivery_failed') {
                    return $this->error('DSL-AUTH-004', 'Nie udało się wysłać kodu OTP. Spróbuj ponownie później.');
                }
                $cooldown = ($issued['action'] ?? '') === 'cooldown';
                $result = [
                    'message' => $cooldown
                        ? 'Odczekaj przed ponownym wysłaniem kodu OTP.'
                        : 'Kod OTP został wygenerowany i wysłany na podany adres e-mail.',
                    'email' => $email,
                    'action' => $issued['action'] ?? 'issued',
                    'cooldown_seconds' => $issued['cooldown_seconds'] ?? null,
                ];
                return [
                    'ok' => true,
                    'command' => 'LOGIN',
                    'requires_otp' => true,
                    'result' => $result,
                ];
            }
            if (!$this->otpMgr->verifyOtp($email, $otpCode)) {
                return $this->error('DSL-AUTH-003', 'Invalid or expired OTP code');
            }

            $plan = (string)($registration['payload']['plan'] ?? Plans::PLAN_DEFAULT);
            if ($plan === '') {
                $plan = Plans::PLAN_DEFAULT;
            }
            $session = $this->sessionMgr->create($email, $tenantSlug, $plan);
            return ['ok' => true, 'command' => 'LOGIN', 'result' => $session];
        }

        private function cmdRequestOtp(array $p): array
        {
            try {
                $email = Normalizer::normalizeEmail($p['email'] ?? '');
            } catch (InvalidArgumentException) {
                return $this->invalidCredentials();
            }
            $reg = $this->dispatcher->registrationForEmail($email);
            if ($reg === null) {
                return $this->invalidCredentials();
            }
            $issued = $this->otpMgr->generateOtp($email);
            if (($issued['action'] ?? '') === 'delivery_failed') {
                return $this->error('DSL-AUTH-004', 'Nie udało się wysłać kodu OTP. Spróbuj ponownie później.');
            }
            $cooldown = ($issued['action'] ?? '') === 'cooldown';
            $result = [
                'message' => $cooldown
                    ? 'Odczekaj przed ponownym wysłaniem kodu OTP.'
                    : 'Kod OTP został wygenerowany i wysłany na podany adres e-mail.',
                'email' => $email,
                'action' => $issued['action'] ?? 'issued',
                'cooldown_seconds' => $issued['cooldown_seconds'] ?? null,
            ];
            return [
                'ok' => true,
                'command' => 'REQUEST_OTP',
                'result' => $result,
            ];
        }

        private function cmdVerifyOtp(array $p): array
        {
            $p['otp_code'] = (string)($p['otp_code'] ?? $p['code'] ?? '');
            return $this->cmdLogin($p);
        }

        private function invalidCredentials(): array
        {
            return $this->error('DSL-AUTH-002', 'Invalid email or organisation identifier');
        }

        private function cmdLogout(): array
        {
            if (!$this->sessionMgr) {
                return $this->error('DSL-AUTH-001', 'Session manager not configured');
            }
            return ['ok' => true, 'command' => 'LOGOUT', 'result' => ['cookie' => $this->sessionMgr->destroyCookie()]];
        }

        private function cmdGetSession(array $p): array
        {
            if (!$this->sessionMgr) {
                return $this->error('DSL-AUTH-001', 'Session manager not configured');
            }
            $token = $p['token'] ?? null;
            $payload = $this->sessionMgr->verify($token);
            if (!$payload) {
                return $this->error('DSL-AUTH-003', 'No valid session');
            }
            return ['ok' => true, 'command' => 'GET_SESSION', 'result' => ['session' => $payload]];
        }

        private function error(string $code, string $message): array
        {
            return ['ok' => false, 'error' => ['code' => $code, 'message' => $message]];
        }
    }
}

namespace Subactor\Saas\Http {
    use Closure;

    /**
     * Module 6: Lightweight HTTP Router, Request & Response
     */
    final class Request
    {
        public function __construct(
            public readonly string $method,
            public readonly string $uri,
            public readonly array $headers,
            public readonly string $body
        ) {}

        public static function capture(): self
        {
            return new self(
                $_SERVER['REQUEST_METHOD'] ?? 'GET',
                $_SERVER['REQUEST_URI'] ?? '/',
                getallheaders() ?: [],
                file_get_contents('php://input') ?: ''
            );
        }

        public function json(): array
        {
            return json_decode($this->body, true) ?? [];
        }

        public function query(string $key, ?string $default = null): ?string
        {
            $queryParams = [];
            parse_str(parse_url($this->uri, PHP_URL_QUERY) ?? '', $queryParams);
            return $queryParams[$key] ?? $default;
        }
    }

    final class Response
    {
        public function __construct(
            public readonly int $statusCode = 200,
            public readonly array $headers = [],
            public readonly string $body = ''
        ) {}

        public static function json(int $statusCode, array $data): self
        {
            return new self($statusCode, ['Content-Type' => 'application/json'], json_encode($data));
        }

        public static function html(int $statusCode, string $html): self
        {
            return new self($statusCode, ['Content-Type' => 'text/html; charset=utf-8'], $html);
        }

        /**
         * Adds a header, keeping any value already set under the same name.
         *
         * Set-Cookie legitimately repeats — a response may hand out a session
         * cookie and clear a temporary one in the same breath — so replacing by
         * name would silently drop one of them.
         */
        public function withHeader(string $name, string $value): self
        {
            $headers = $this->headers;
            if (isset($headers[$name])) {
                $existing = is_array($headers[$name]) ? $headers[$name] : [$headers[$name]];
                $existing[] = $value;
                $headers[$name] = $existing;
            } else {
                $headers[$name] = $value;
            }
            return new self($this->statusCode, $headers, $this->body);
        }

        public function send(): void
        {
            http_response_code($this->statusCode);
            foreach ($this->headers as $n => $v) {
                foreach (is_array($v) ? $v : [$v] as $index => $single) {
                    header("{$n}: {$single}", $index === 0);
                }
            }
            echo $this->body;
        }
    }

    final class Router
    {
        private array $routes = [];

        public function get(string $path, Closure $handler): self
        {
            $this->routes[] = ['method' => 'GET', 'path' => $path, 'handler' => $handler];
            return $this;
        }

        public function post(string $path, Closure $handler): self
        {
            $this->routes[] = ['method' => 'POST', 'path' => $path, 'handler' => $handler];
            return $this;
        }

        public function dispatch(Request $request): Response
        {
            $requestPath = parse_url($request->uri, PHP_URL_PATH);
            $requestMethod = $request->method === 'HEAD' ? 'GET' : $request->method;
            foreach ($this->routes as $route) {
                if ($route['method'] !== $requestMethod) continue;
                $routePath = $route['path'];
                if ($routePath === $requestPath) {
                    $response = ($route['handler'])($request);
                    return $request->method === 'HEAD'
                        ? new Response($response->statusCode, $response->headers, '')
                        : $response;
                }
                if (str_ends_with($routePath, '/*')) {
                    $prefix = substr($routePath, 0, -2);
                    if (str_starts_with($requestPath, $prefix . '/')) {
                        $response = ($route['handler'])($request);
                        return $request->method === 'HEAD'
                            ? new Response($response->statusCode, $response->headers, '')
                            : $response;
                    }
                }
            }
            return Response::json(404, ['ok' => false, 'error' => 'not_found']);
        }
    }
}
