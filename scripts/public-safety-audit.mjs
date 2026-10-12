import { lstat, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const ignoredDirectories = new Set(['node_modules', 'dist', '.git']);
const readableExtensions = new Set(['.css', '.html', '.json', '.md', '.mjs', '.ts', '.tsx', '.txt', '.yaml', '.yml']);
const failures = [];
const inventory = [];

const forbiddenNames = [
  /^\.env($|\.)/,
  /service[-_]?account/i,
  /private[-_]?key/i,
  /migration/i,
  /seed\.sql$/i,
  /clinical[-_]?engine/i,
];

const credentialPatterns = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /(?:api|access|secret)[_-]?key\s*[:=]\s*["'][^"']{12,}["']/i,
  /password\s*[:=]\s*["'][^"']{8,}["']/i,
  /postgres(?:ql)?:\/\/[^\s]+/i,
  /https:\/\/[a-z0-9-]+\.supabase\.co/i,
];

const privateArtifactPatterns = [/service_role/i, /\/Users\//];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(root, absolute);
    const stat = await lstat(absolute);
    if (stat.isSymbolicLink()) {
      failures.push(`${relative}: symbolic links are not allowed`);
      continue;
    }
    if (entry.isDirectory()) {
      await walk(absolute);
      continue;
    }
    inventory.push(relative);
    if (forbiddenNames.some((pattern) => pattern.test(entry.name))) failures.push(`${relative}: prohibited filename`);
    if (!readableExtensions.has(path.extname(entry.name).toLowerCase())) continue;
    const content = await readFile(absolute, 'utf8');
    if (relative !== 'scripts/public-safety-audit.mjs') {
      for (const pattern of credentialPatterns) if (pattern.test(content)) failures.push(`${relative}: possible credential material`);
      for (const pattern of privateArtifactPatterns) if (pattern.test(content)) failures.push(`${relative}: private-project artifact reference`);
    }
    if (/from\s+["']\.\.\//.test(content) && relative.startsWith('src/')) failures.push(`${relative}: parent-directory source import`);
  }
}

await walk(root);

if (failures.length) {
  console.error('Public safety audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Public safety audit passed: ${inventory.length} files checked; no secrets, symbolic links, parent imports or private artifacts detected.`);
