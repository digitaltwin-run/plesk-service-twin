import fs from 'node:fs';
import path from 'node:path';
import { runPleskPreflight } from './preflight.mjs';
import {
  buildPublicArtifact,
  hashPublicArtifact,
  syncPublicArtifact
} from './public-artifact.mjs';
import { resolvePublishTarget } from './inventory.mjs';

const args = process.argv.slice(2);
const isApply = args.includes('--apply');
const isDryRun = args.includes('--dry-run') || !isApply;
const planHashIndex = args.indexOf('--plan-hash');
const requestedPlanHash = planHashIndex >= 0 ? String(args[planHashIndex + 1] || '').trim() : '';
const positionalArgs = args.filter((argument, index) => {
  if (argument.startsWith('--')) return false;
  return planHashIndex < 0 || index !== planHashIndex + 1;
});
const targetDir = positionalArgs[0] || process.cwd();
const adminUrl = process.env.PLESK_ADMIN_URL || 'http://127.0.0.1:8792';
const twinHttpdocs = path.resolve(path.dirname(import.meta.url).replace('file://', ''), '../httpdocs');

console.log(`Plesk Publisher — ${isApply ? 'APPLY MODE' : 'DRY-RUN PLAN MODE'}`);
console.log(`Source directory: ${targetDir}`);

// Phase 1: Preflight
const preflight = await runPleskPreflight(targetDir, { adminUrl });
if (!preflight.ok) {
  console.error('\nPreflight failed! Publication aborted.');
  process.exit(1);
}

let artifact;
try {
  artifact = buildPublicArtifact(targetDir);
} catch (error) {
  console.error(`\nPublic artifact rejected: ${error.message}`);
  process.exit(1);
}

const cleanupArtifact = () => artifact?.cleanup();
process.on('exit', cleanupArtifact);
const artifactHash = hashPublicArtifact(artifact.root, artifact.files);
const publishTarget = resolvePublishTarget({ targetDir });
const publicationDomain = publishTarget.domain;
const targetDocroot = publishTarget.docroot;
if (!publicationDomain || !targetDocroot) {
  console.error('\nPublish target is not in the Plesk account inventory.');
  console.error('Set PLESK_PUBLISH_DOMAIN / PLESK_TARGET_DOCROOT or add the domain to inventory/account-subscriptions.json.');
  process.exit(1);
}
console.log(`Account: ${publishTarget.account_id}`);
console.log(`Subscription: ${publishTarget.subscription_name || '(unbound)'}`);
console.log(`Domain: ${publicationDomain}`);
console.log(`Docroot: ${targetDocroot}`);

if (isApply && !requestedPlanHash) {
  console.error('\nApply requires the exact --plan-hash returned by a preceding dry-run.');
  process.exit(1);
}

const applyGrant = String(process.env.URIRUN_APPLY_GRANT || process.env.PLESK_APPLY_GRANT || '').trim();
if (isApply && !applyGrant) {
  console.error('\nApply requires URIRUN_APPLY_GRANT or PLESK_APPLY_GRANT.');
  process.exit(1);
}

// Phase 2: Plan Generation
let planResponse;
if (isApply) {
  planResponse = {
    ok: true,
    plan: {
      plan_id: 'approved-dry-run',
      plan_hash: requestedPlanHash,
      domain: publicationDomain,
      target_docroot: targetDocroot,
      files_to_sync: artifact.files.length,
      artifact_hash: artifactHash
    }
  };
} else {
  console.log('\nRequesting publication plan from Plesk Admin API...');
  try {
    const resp = await fetch(`${adminUrl}/api/v2/publication/plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        domain: publicationDomain,
        source_ref: 'workspace:www',
        files_count: artifact.files.length,
        artifact_hash: artifactHash
      })
    });
    if (!resp.ok) throw new Error(`plan request returned ${resp.status}`);
    planResponse = await resp.json();
  } catch (err) {
    console.log(`⚠ Plesk API unreachable at ${adminUrl}. Operating in offline dry-run mode.`);
    planResponse = {
      ok: true,
      plan: {
        plan_id: 'offline-dry-run',
        plan_hash: `offline:${artifactHash}`,
        domain: publicationDomain,
        target_docroot: targetDocroot,
        files_to_sync: artifact.files.length,
        artifact_hash: artifactHash
      }
    };
  }
}

console.log('\n--- Publication Plan Summary ---');
console.log(`Plan ID:    ${planResponse.plan.plan_id}`);
console.log(`Plan Hash:  ${planResponse.plan.plan_hash}`);
console.log(`Target:     ${planResponse.plan.target_docroot}`);
console.log(`Sync Count: ${planResponse.plan.files_to_sync} files`);
console.log(`Artifact:   ${artifactHash}`);

if (isDryRun && !isApply) {
  console.log('\n[DRY-RUN SUCCESS] Plan calculated and verified.');
  console.log('To apply changes, provide single-use grant and execute:');
  console.log(`  export URIRUN_APPLY_GRANT='signed-single-use-grant'`);
  console.log(`  node src/publish.mjs ${targetDir} --apply --plan-hash ${planResponse.plan.plan_hash}`);
  process.exit(0);
}

// Phase 3: Apply
console.log('\nExecuting guarded deployment to Plesk...');

try {
  const applyResp = await fetch(`${adminUrl}/api/v2/publication/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Apply-Grant': applyGrant,
      'X-Plan-Hash': planResponse.plan.plan_hash
    },
    body: JSON.stringify({
      plan_hash: planResponse.plan.plan_hash,
      artifact_hash: artifactHash
    })
  });
  if (!applyResp.ok) {
    const failure = await applyResp.json().catch(() => ({}));
    throw new Error(failure.error || `apply request returned ${applyResp.status}`);
  }
  const applyResult = await applyResp.json();
  if (applyResult.ok) {
    if (fs.existsSync(twinHttpdocs)) {
      console.log(`--> Synchronizing files to Digital Twin Webspace (${twinHttpdocs})...`);
      const syncResult = syncPublicArtifact(artifact.root, twinHttpdocs);
      console.log(`    Published ${artifact.files.length} allowlisted files.`);
      console.log(`    Previous docroot retained outside webspace: ${syncResult.backup}`);
    }
    console.log(`\n✓ [PUBLISH SUCCESS] Domain ${publicationDomain} updated successfully at ${applyResult.timestamp}`);
    console.log(`  Preview Live Webspace: http://localhost:8791`);
  } else {
    console.error(`\n✗ [PUBLISH FAILED] ${applyResult.error}`);
    process.exit(1);
  }
} catch (err) {
  console.error(`\n✗ [PUBLISH FAILED] ${err.message}`);
  process.exit(1);
}
