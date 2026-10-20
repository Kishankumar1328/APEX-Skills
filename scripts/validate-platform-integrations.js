#!/usr/bin/env node
/**
 * validate-platform-integrations.js
 * Validates manifest schemas, entry points, commands, and file paths
 * across Antigravity, Cursor, Codex, and Claude Code platform adapters.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const errors = [];
const passed = [];

function checkFile(relPath, requiredFields = []) {
  const fullPath = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required file: ${relPath}`);
    return null;
  }
  if (relPath.endsWith('.json')) {
    try {
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      for (const field of requiredFields) {
        if (!(field in data)) {
          errors.push(`${relPath} missing required field: '${field}'`);
        }
      }
      passed.push(`${relPath} valid JSON with fields [${requiredFields.join(', ')}]`);
      return data;
    } catch (e) {
      errors.push(`Invalid JSON syntax in ${relPath}: ${e.message}`);
      return null;
    }
  } else {
    passed.push(`${relPath} exists`);
    return true;
  }
}

function checkRelativePath(manifestPath, value, field) {
  if (typeof value !== 'string') return;
  const fullPath = path.resolve(ROOT_DIR, value);
  if (!fs.existsSync(fullPath)) {
    errors.push(`${manifestPath} ${field} path does not exist: ${value}`);
  }
}

console.log('=== Validating APEX Platform Integrations ===\n');

// 1. Root portable Agent Plugins manifest
const rootManifest = checkFile('plugin.json', ['$schema', 'name', 'version', 'description', 'license']);
if (!fs.existsSync(path.join(ROOT_DIR, 'LICENSE'))) {
  errors.push('Missing LICENSE file declared by plugin manifest');
}

// 2. Antigravity manifest
const antigravity = checkFile('.antigravity-plugin/plugin.json', ['name', 'displayName', 'version', 'skills']);

// 3. Cursor manifest
const cursor = checkFile('.cursor-plugin/plugin.json', ['name', 'displayName', 'version', 'skills']);

// 4. Codex manifest
const codex = checkFile('.codex-plugin/plugin.json', ['name', 'version', 'skills', 'interface']);

// 5. Claude Code manifest
const claude = checkFile('.claude-plugin/plugin.json', ['name', 'version', 'commands', 'skills']);

for (const [manifestPath, manifest] of [
  ['.antigravity-plugin/plugin.json', antigravity],
  ['.cursor-plugin/plugin.json', cursor],
  ['.codex-plugin/plugin.json', codex],
  ['.claude-plugin/plugin.json', claude]
]) {
  if (!manifest) continue;
  if (rootManifest && (manifest.name !== rootManifest.name || manifest.version !== rootManifest.version)) {
    errors.push(`${manifestPath} name/version must match plugin.json`);
  }
  checkRelativePath(manifestPath, manifest.skills, 'skills');
  checkRelativePath(manifestPath, manifest.commands, 'commands');
}

// 6. Slash commands
checkFile('commands/develop.md');
checkFile('commands/test.md');
checkFile('commands/debug.md');
checkFile('commands/review.md');
checkFile('commands/qa-summary.md');
checkFile('AGENTS.md');
checkFile('.agents/plugins/marketplace.json', ['name', 'plugins']);
checkFile('.cursor/rules/apex-sdlc.mdc');
checkFile('.github/copilot-instructions.md');

// 7. Core skill entrypoints check
checkFile('skills/developer-skill/SKILL.md');
checkFile('skills/testing-skill/SKILL.md');
checkFile('skills/defect-handoff-contract.md');
checkFile('skills/PLATFORM-COMPATIBILITY.md');

console.log('Validation Results:');
passed.forEach(p => console.log(`  ✔ [PASS] ${p}`));

if (errors.length > 0) {
  console.log('\nValidation Failures:');
  errors.forEach(e => console.log(`  ✖ [FAIL] ${e}`));
  console.log('\nResult: PLATFORM INTEGRATION VALIDATION FAILED');
  process.exit(1);
} else {
  console.log(`\nResult: ALL ${passed.length} PLATFORM INTEGRATION CHECKS PASSED (exit code 0)`);
  process.exit(0);
}
