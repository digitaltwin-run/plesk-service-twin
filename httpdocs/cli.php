<?php

declare(strict_types=1);

require_once __DIR__ . '/Modules.php';

use Subactor\Saas\Config\PortalConfig;
use Subactor\Saas\Database\DatabaseConnection;
use Subactor\Saas\Domain\TrialManager;
use Subactor\Saas\Poa\EventStore;
use Subactor\Saas\Poa\CommandDispatcher;
use Subactor\Saas\Session\SessionManager;
use Subactor\Saas\Dsl\DslInterpreter;

$config = PortalConfig::fromEnv();
$eventStore = new EventStore();
$dispatcher = new CommandDispatcher($eventStore);
$sessionMgr = new SessionManager(
    secret: $config->runtimeHmacSecret(),
    ttlSeconds: $config->sessionTtlSeconds,
    cookieSecure: $config->cookieSecure
);
$dslInterpreter = new DslInterpreter($dispatcher, $sessionMgr);

$cmd = $argv[2] ?? ($argv[1] ?? 'status');

if ($cmd === 'status') {
    echo "Subactor SaaS PHP Runtime Status:\n";
    echo "PHP Version: " . PHP_VERSION . "\n";
    echo "Domain: " . $config->domain . "\n";
    echo "Payment Provider: " . $config->paymentProvider . "\n";
    echo "POA Actor Engine: Enabled (CQRS + ES)\n";
    echo "DSL Schema: " . DslInterpreter::SCHEMA . "\n";
    echo "DSL Commands: " . implode(', ', DslInterpreter::COMMANDS) . "\n";
} elseif ($cmd === 'poa:dispatch') {
    $commandName = $argv[3] ?? 'CreateTenant';
    $jsonPayload = $argv[4] ?? '{"email":"admin@firma.pl","tenant_slug":"firma","plan":"starter_trial"}';
    $payload = json_decode($jsonPayload, true) ?? [];
    $result = $dispatcher->dispatch($commandName, $payload);
    echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
} elseif ($cmd === 'dsl:execute') {
    $jsonDsl = $argv[3] ?? '{"command":"LIST_PLANS","payload":{}}';
    $dsl = json_decode($jsonDsl, true) ?? [];
    $result = $dslInterpreter->execute($dsl);
    echo json_encode($result, JSON_PRETTY_PRINT) . "\n";
} elseif ($cmd === 'dsl:shell') {
    echo "Subactor Portal Operations DSL Shell (" . DslInterpreter::SCHEMA . ")\n";
    echo "Commands: " . implode(', ', DslInterpreter::COMMANDS) . "\n";
    echo "Type 'help' for usage, 'exit' to quit.\n\n";

    while (true) {
        echo "dsl> ";
        $line = trim(fgets(STDIN) ?: '');
        if ($line === '' || $line === 'exit' || $line === 'quit') {
            if ($line !== '') echo "Bye.\n";
            break;
        }
        if ($line === 'help') {
            echo "Usage: {\"command\":\"COMMAND_NAME\",\"payload\":{...}}\n";
            echo "Commands:\n";
            foreach (DslInterpreter::COMMANDS as $c) {
                echo "  $c\n";
            }
            echo "Examples:\n";
            echo '  {"command":"LIST_PLANS","payload":{"interval":"month"}}' . "\n";
            echo '  {"command":"VALIDATE_PROMO","payload":{"code":"NOCC100"}}' . "\n";
            echo '  {"command":"CREATE_TENANT","payload":{"email":"a@b.pl","tenant_slug":"test","plan":"saas-promo","promo_code":"NOCC100"}}' . "\n";
            echo '  {"command":"LIST_INTEGRATIONS","payload":{}}' . "\n\n";
            continue;
        }
        $dsl = json_decode($line, true);
        if ($dsl === null && json_last_error() !== JSON_ERROR_NONE) {
            echo "Error: Invalid JSON — " . json_last_error_msg() . "\n";
            continue;
        }
        $result = $dslInterpreter->execute($dsl);
        echo json_encode($result, JSON_PRETTY_PRINT) . "\n\n";
    }
} elseif ($cmd === 'dsl:schema') {
    echo json_encode([
        'schema' => DslInterpreter::SCHEMA,
        'commands' => DslInterpreter::COMMANDS,
    ], JSON_PRETTY_PRINT) . "\n";
} elseif ($cmd === 'mcp:tools') {
    $tools = [
        [
            'name' => 'poa_dispatch_command',
            'description' => 'Dispatch a Process-Oriented Actor command in PHP runtime',
            'inputSchema' => [
                'type' => 'object',
                'properties' => [
                    'command' => ['type' => 'string', 'enum' => ['CreateTenant', 'SelectPlan']],
                    'payload' => ['type' => 'object'],
                ],
                'required' => ['command', 'payload'],
            ],
        ],
        [
            'name' => 'dsl_execute',
            'description' => 'Execute a Portal Operations DSL command (subactor.portal-operations/v1)',
            'inputSchema' => [
                'type' => 'object',
                'properties' => [
                    'command' => ['type' => 'string', 'enum' => DslInterpreter::COMMANDS],
                    'payload' => ['type' => 'object'],
                ],
                'required' => ['command'],
            ],
        ],
        [
            'name' => 'get_portal_config',
            'description' => 'Retrieve Subactor SaaS Portal configuration',
            'inputSchema' => ['type' => 'object'],
        ],
    ];
    echo json_encode(['tools' => $tools], JSON_PRETTY_PRINT) . "\n";
} else {
    echo "Usage: php cli.php [status|poa:dispatch|dsl:execute|dsl:shell|dsl:schema|mcp:tools]\n";
    echo "  status         - Show runtime status\n";
    echo "  poa:dispatch   - Dispatch a POA CQRS command\n";
    echo "  dsl:execute    - Execute a single DSL command (JSON arg)\n";
    echo "  dsl:shell      - Interactive DSL REPL shell\n";
    echo "  dsl:schema     - Print DSL schema and commands\n";
    echo "  mcp:tools      - List MCP tools\n";
}
