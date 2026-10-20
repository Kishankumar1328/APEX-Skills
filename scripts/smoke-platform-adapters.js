#!/usr/bin/env node
/**
 * Offline smoke checks for shipped platform manifests. These checks prove
 * package consistency only; they cannot prove installation in a live IDE.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const adapters = [
  ['Antigravity', '.antigravity-plugin/plugin.json', ['skills']],
  ['Cursor', '.cursor-plugin/plugin.json', ['skills']],
  ['Codex', '.codex-plugin/plugin.json', ['skills', 'interface']],
  ['Claude Code', '.claude-plugin/plugin.json', ['skills', 'commands']]
];
const rootManifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'plugin.json'), 'utf8'));
const errors = [];

for (const [platform, manifestPath, fields] of adapters) {
  const fullPath = path.join(ROOT, manifestPath);
  const manifest = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  if (manifest.name !== rootManifest.name || manifest.version !== rootManifest.version) {
    errors.push(`${platform} manifest name/version does not match plugin.json`);
  }
  for (const field of fields) {
    if (!(field in manifest)) errors.push(`${platform} manifest is missing '${field}'`);
  }
  for (const field of ['skills', 'commands']) {
    if (typeof manifest[field] === 'string') {
      const resolved = path.resolve(ROOT, manifest[field]);
      if (!fs.existsSync(resolved)) errors.push(`${platform} ${field} path does not exist: ${manifest[field]}`);
    }
  }
}

if (errors.length) {
  console.error('Platform adapter smoke check failed:');
  errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}
console.log('Platform adapter offline smoke checks passed.');
