#!/usr/bin/env node
/**
 * Offline smoke checks for shipped platform manifests. These checks prove
 * package consistency only; they cannot prove installation in a live IDE.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
// Shipped manifests use package-root-relative paths. Cursor's actual local
// discovery surface is checked separately by validate-platform-integrations.
const adapters = [
  ['Antigravity', '.antigravity-plugin/plugin.json', ['skills'], 'package-root'],
  ['Cursor', '.cursor-plugin/plugin.json', ['skills'], 'package-root'],
  ['Codex', '.codex-plugin/plugin.json', ['skills', 'interface'], 'package-root'],
  ['Claude Code', '.claude-plugin/plugin.json', ['skills', 'commands'], 'package-root']
];
const rootManifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'plugin.json'), 'utf8'));
const errors = [];

for (const [platform, manifestPath, fields, resolutionBase] of adapters) {
  const fullPath = path.join(ROOT, manifestPath);
  const manifest = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  if (manifest.name !== rootManifest.name || manifest.version !== rootManifest.version) {
    errors.push(`${platform} manifest name/version does not match plugin.json`);
  }
  for (const field of fields) {
    if (!(field in manifest)) errors.push(`${platform} manifest is missing '${field}'`);
  }
  for (const field of ['skills', 'commands']) {
    for (const declaredPath of [].concat(manifest[field] || [])) {
      if (typeof declaredPath !== 'string') continue;
      const resolved = path.resolve(resolutionBase === 'package-root' ? ROOT : path.dirname(fullPath), declaredPath);
      if (!fs.existsSync(resolved)) errors.push(`${platform} ${field} path does not exist from ${resolutionBase}: ${declaredPath}`);
    }
  }
}

if (errors.length) {
  console.error('Platform adapter smoke check failed:');
  errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}
console.log('Platform adapter offline metadata smoke checks passed; installation and invocation were not run.');
