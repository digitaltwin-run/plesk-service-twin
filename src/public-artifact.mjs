import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';

export const DEFAULT_PUBLIC_ENTRIES = Object.freeze([
  'index.html',
  'index.php',
  'Modules.php',
  'cli.php',
  'privacy.html',
  'security.html',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  'assets',
  'pl',
  'cache',
  'config',
  '.well-known',
  '.htaccess'
]);

const FORBIDDEN_SEGMENTS = new Set([
  '.git',
  '.github',
  '.hg',
  '.svn',
  'node_modules'
]);

const FORBIDDEN_FILES = new Set([
  '.env',
  '.env.local',
  '.htaccess',
  '.htpasswd'
]);

function assertSafeRelativePath(relativePath) {
  const segments = relativePath.split(path.sep).filter(Boolean);
  for (const segment of segments) {
    if (FORBIDDEN_SEGMENTS.has(segment) || FORBIDDEN_FILES.has(segment)) {
      throw new Error(`forbidden publication path: ${relativePath}`);
    }
    if (segment.startsWith('.') && segment !== '.well-known') {
      throw new Error(`hidden publication path is not allowed: ${relativePath}`);
    }
  }
}

function copyTree(sourceRoot, sourcePath, destinationPath, files) {
  const relativePath = path.relative(sourceRoot, sourcePath);
  assertSafeRelativePath(relativePath);

  const stat = fs.lstatSync(sourcePath);
  if (stat.isSymbolicLink()) {
    throw new Error(`symbolic links are not allowed in publication artifacts: ${relativePath}`);
  }

  if (stat.isDirectory()) {
    fs.mkdirSync(destinationPath, {recursive: true});
    for (const entry of fs.readdirSync(sourcePath, {withFileTypes: true})) {
      copyTree(
        sourceRoot,
        path.join(sourcePath, entry.name),
        path.join(destinationPath, entry.name),
        files
      );
    }
    return;
  }

  if (!stat.isFile()) {
    throw new Error(`unsupported publication entry: ${relativePath}`);
  }

  fs.mkdirSync(path.dirname(destinationPath), {recursive: true});
  fs.copyFileSync(sourcePath, destinationPath);
  fs.chmodSync(destinationPath, stat.mode & 0o777);
  files.push(relativePath.split(path.sep).join('/'));
}

export function buildPublicArtifact(sourceDir, options = {}) {
  const sourceRoot = path.resolve(sourceDir);
  const entries = options.entries || DEFAULT_PUBLIC_ENTRIES;
  const stageRoot = fs.mkdtempSync(path.join(options.tempRoot || os.tmpdir(), 'plesk-public-artifact-'));
  const files = [];

  try {
    for (const entry of entries) {
      if (!DEFAULT_PUBLIC_ENTRIES.includes(entry)) {
        throw new Error(`publication entry is not allowlisted: ${entry}`);
      }
      const sourcePath = path.join(sourceRoot, entry);
      if (!fs.existsSync(sourcePath)) continue;
      copyTree(sourceRoot, sourcePath, path.join(stageRoot, entry), files);
    }

    if (!files.includes('index.html') && !files.includes('index.php')) {
      throw new Error('publication artifact requires index.html or index.php');
    }

    return {
      root: stageRoot,
      files: files.sort(),
      cleanup() {
        fs.rmSync(stageRoot, {recursive: true, force: true});
      }
    };
  } catch (error) {
    fs.rmSync(stageRoot, {recursive: true, force: true});
    throw error;
  }
}

export function hashPublicArtifact(artifactRoot, files) {
  const hash = crypto.createHash('sha256');
  for (const file of [...files].sort()) {
    hash.update(file);
    hash.update('\0');
    hash.update(fs.readFileSync(path.join(artifactRoot, file)));
    hash.update('\0');
  }
  return `sha256:${hash.digest('hex')}`;
}

function clearDirectory(directory) {
  fs.mkdirSync(directory, {recursive: true});
  for (const entry of fs.readdirSync(directory)) {
    fs.rmSync(path.join(directory, entry), {recursive: true, force: true});
  }
}

function copyDirectoryContents(source, destination) {
  fs.mkdirSync(destination, {recursive: true});
  for (const entry of fs.readdirSync(source)) {
    fs.cpSync(path.join(source, entry), path.join(destination, entry), {
      recursive: true,
      preserveTimestamps: true
    });
  }
}

export function syncPublicArtifact(artifactRoot, destinationDir, options = {}) {
  const source = path.resolve(artifactRoot);
  const destination = path.resolve(destinationDir);
  const backup = path.resolve(
    options.backupDir || path.join(path.dirname(destination), '.httpdocs-private-backup')
  );

  if (source === destination || destination === backup || source === backup) {
    throw new Error('publication source, destination and backup must be distinct');
  }

  clearDirectory(backup);
  if (fs.existsSync(destination)) copyDirectoryContents(destination, backup);

  try {
    clearDirectory(destination);
    copyDirectoryContents(source, destination);
  } catch (error) {
    clearDirectory(destination);
    copyDirectoryContents(backup, destination);
    throw error;
  }

  return {destination, backup};
}
