import fs from 'node:fs';
import path from 'node:path';

export async function runPleskPreflight(sourceDir, options = {}) {
  const results = {
    ok: true,
    checks: [],
    errors: [],
    warnings: []
  };

  const cleanPath = path.resolve(sourceDir);
  if (!fs.existsSync(cleanPath)) {
    results.ok = false;
    results.errors.push(`Source directory does not exist: ${cleanPath}`);
    return results;
  }

  // Check 1: Directory Structure & Plesk httpdocs compliance
  const entries = fs.readdirSync(cleanPath);
  results.checks.push({ name: 'directory_exists', status: 'pass', path: cleanPath });

  // Check 2: plesk_default_page_shadowing
  const hasIndexHtml = entries.includes('index.html');
  const hasIndexPhp = entries.includes('index.php');

  if (hasIndexHtml && hasIndexPhp) {
    const htmlContent = fs.readFileSync(path.join(cleanPath, 'index.html'), 'utf8');
    if (htmlContent.includes('Domain Default Page') || htmlContent.includes('Plesk')) {
      results.ok = false;
      results.errors.push(`[plesk_default_page_shadowing] Plesk default index.html is shadowing index.php! Remove index.html before deployment.`);
    } else {
      results.warnings.push(`Both index.html and index.php exist. Ensure Nginx/Apache index order prefers desired target.`);
    }
  }

  // Check 3: Source Completeness Scanner for PHP require/include statements
  const phpFiles = entries.filter(f => f.endsWith('.php'));
  let missingDependencies = [];

  for (const file of phpFiles) {
    const filePath = path.join(cleanPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const matches = content.matchAll(/(?:require|include)(?:_once)?\s*\(?['"]([^'"]+)['"]\)?/g);
    for (const match of matches) {
      const relImport = match[1];
      if (!relImport.startsWith('http')) {
        const normalizedImport = relImport.replace(/^\/+/, '');
        const targetPath = path.resolve(cleanPath, normalizedImport);
        if (!fs.existsSync(targetPath)) {
          missingDependencies.push({ file, missing: relImport });
        }
      }
    }
  }

  if (missingDependencies.length > 0) {
    results.ok = false;
    for (const dep of missingDependencies) {
      results.errors.push(`[source_completeness] File '${dep.file}' requires '${dep.missing}' which does not exist in target source.`);
    }
  } else {
    results.checks.push({ name: 'source_completeness', status: 'pass', scannedPhpFiles: phpFiles.length });
  }

  // Check 4: Plesk Twin REST API check if endpoint is provided
  const adminUrl = options.adminUrl || process.env.PLESK_ADMIN_URL || 'http://127.0.0.1:8792';
  try {
    const resp = await fetch(`${adminUrl}/healthz`, { signal: AbortSignal.timeout(2000) });
    if (resp.ok) {
      const data = await resp.json();
      results.checks.push({ name: 'plesk_admin_twin_api', status: 'pass', details: data });
    } else {
      results.warnings.push(`Plesk Admin Mock API returned status ${resp.status}`);
    }
  } catch (err) {
    results.warnings.push(`Plesk Admin Mock API unreachable at ${adminUrl} (offline dry-run active)`);
  }

  return results;
}

// CLI Execution runner
if (process.argv[1] && process.argv[1].endsWith('preflight.mjs')) {
  const targetDir = process.argv[2] || process.cwd();
  console.log(`Running Plesk Preflight Check on: ${targetDir}`);
  const result = await runPleskPreflight(targetDir);

  console.log('\n--- Preflight Results ---');
  for (const check of result.checks) {
    console.log(`✓ [PASS] ${check.name}`);
  }
  for (const warn of result.warnings) {
    console.log(`⚠ [WARN] ${warn}`);
  }
  for (const err of result.errors) {
    console.log(`✗ [FAIL] ${err}`);
  }

  if (!result.ok) {
    console.error('\nPreflight failed! Aborting publish.');
    process.exit(1);
  } else {
    console.log('\nPreflight PASSED! Ready for Plesk publication.');
  }
}
