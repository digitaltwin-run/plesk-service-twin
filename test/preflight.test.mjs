import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { runPleskPreflight } from '../src/preflight.mjs';
import {
  buildPublicArtifact,
  hashPublicArtifact,
  syncPublicArtifact
} from '../src/public-artifact.mjs';

console.log('Running Plesk Digital Twin Test Suite...');

const tmpDir = path.resolve('./test/tmp_site');
if (fs.existsSync(tmpDir)) {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
fs.mkdirSync(tmpDir, { recursive: true });

// Scenario 1: Valid static site
fs.writeFileSync(path.join(tmpDir, 'index.html'), '<html><body>Subactor Home</body></html>');
fs.writeFileSync(path.join(tmpDir, 'app.css'), 'body { background: #000; }');

const res1 = await runPleskPreflight(tmpDir);
assert.strictEqual(res1.ok, true, 'Valid site should pass preflight');
console.log('✓ Scenario 1: Valid static site passed preflight');

// Scenario 2: Shadowing detection (Plesk default page)
fs.writeFileSync(path.join(tmpDir, 'index.html'), '<html><body>Domain Default Page - Plesk</body></html>');
fs.writeFileSync(path.join(tmpDir, 'index.php'), '<?php echo "Hello"; ?>');

const res2 = await runPleskPreflight(tmpDir);
assert.strictEqual(res2.ok, false, 'Plesk default shadowing should fail preflight');
assert.ok(res2.errors.some(e => e.includes('plesk_default_page_shadowing')), 'Should report plesk_default_page_shadowing error');
console.log('✓ Scenario 2: Default page shadowing correctly detected and blocked');

// Scenario 3: Source completeness check (missing require)
fs.unlinkSync(path.join(tmpDir, 'index.html'));
fs.writeFileSync(path.join(tmpDir, 'index.php'), '<?php require "/lib/missing.php"; ?>');

const res3 = await runPleskPreflight(tmpDir);
assert.strictEqual(res3.ok, false, 'Missing require file should fail preflight');
assert.ok(res3.errors.some(e => e.includes('source_completeness')), 'Should report source_completeness error');
console.log('✓ Scenario 3: Missing dependency correctly detected');

// Scenario 4: Public artifact allowlist and private-source exclusion
fs.rmSync(tmpDir, { recursive: true, force: true });
fs.mkdirSync(path.join(tmpDir, 'assets'), { recursive: true });
fs.mkdirSync(path.join(tmpDir, '.git'), { recursive: true });
fs.mkdirSync(path.join(tmpDir, 'docs'), { recursive: true });
fs.writeFileSync(path.join(tmpDir, 'index.html'), '<html><body>Public</body></html>');
fs.writeFileSync(path.join(tmpDir, 'assets', 'app.css'), 'body {}');
fs.writeFileSync(path.join(tmpDir, '.git', 'HEAD'), 'ref: refs/heads/main');
fs.writeFileSync(path.join(tmpDir, '.env'), 'SECRET=do-not-publish');
fs.writeFileSync(path.join(tmpDir, 'docs', 'internal.md'), 'private');

const artifact = buildPublicArtifact(tmpDir);
assert.deepStrictEqual(artifact.files, ['assets/app.css', 'index.html']);
assert.match(hashPublicArtifact(artifact.root, artifact.files), /^sha256:[a-f0-9]{64}$/);
assert.strictEqual(fs.existsSync(path.join(artifact.root, '.git', 'HEAD')), false);
assert.strictEqual(fs.existsSync(path.join(artifact.root, '.env')), false);
assert.strictEqual(fs.existsSync(path.join(artifact.root, 'docs')), false);

const targetDir = path.resolve('./test/tmp_httpdocs');
const backupDir = path.resolve('./test/tmp_httpdocs_backup');
fs.mkdirSync(path.join(targetDir, '.git'), {recursive: true});
fs.writeFileSync(path.join(targetDir, '.git', 'HEAD'), 'private');
syncPublicArtifact(artifact.root, targetDir, {backupDir});
assert.strictEqual(fs.existsSync(path.join(targetDir, '.git')), false);
assert.strictEqual(fs.readFileSync(path.join(targetDir, 'index.html'), 'utf8'), '<html><body>Public</body></html>');
assert.strictEqual(fs.existsSync(path.join(backupDir, '.git', 'HEAD')), true);
artifact.cleanup();
fs.rmSync(targetDir, {recursive: true, force: true});
fs.rmSync(backupDir, {recursive: true, force: true});
console.log('✓ Scenario 4: Only allowlisted public files reach httpdocs');

// Scenario 5: The publisher accepts an explicit source during dry-run.
const publisherSource = fs.readFileSync(path.resolve('./src/publish.mjs'), 'utf8');
assert.match(
  publisherSource,
  /planHashIndex < 0 \|\| index !== planHashIndex \+ 1/,
  'Dry-run source must not be mistaken for a --plan-hash value'
);
console.log('✓ Scenario 5: Publisher source argument regression is guarded');

// Cleanup
fs.rmSync(tmpDir, { recursive: true, force: true });
console.log('\nAll 5 Plesk Digital Twin test scenarios PASSED!');
