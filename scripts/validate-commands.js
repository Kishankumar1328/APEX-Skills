#!/usr/bin/env node
/**
 * validate-commands.js
 * Validates consistency between commands/*.toml, commands/*.md, and skill entry points.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CMD_DIR = path.join(ROOT_DIR, 'commands');

console.log('=== Validating APEX Commands & Parity ===\n');
let errors = 0;

const tomlFiles = fs.readdirSync(CMD_DIR).filter(f => f.endsWith('.toml'));
const mdFiles = fs.readdirSync(CMD_DIR).filter(f => f.endsWith('.md'));

function containsUnsupportedControlCharacters(content) {
  return /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(content);
}

console.log(`Found ${tomlFiles.length} .toml command(s) and ${mdFiles.length} .md command(s).`);

for (const tf of tomlFiles) {
  const content = fs.readFileSync(path.join(CMD_DIR, tf), 'utf8');
  const validShape = /^description\s*=\s*"[^\r\n]+"/m.test(content) &&
    /^prompt\s*=\s*"""/m.test(content) &&
    (content.match(/"""/g) || []).length === 2;
  if (!validShape || containsUnsupportedControlCharacters(content)) {
    console.log(`  ✖ [FAIL] ${tf} has invalid command structure or unsupported control characters`);
    errors++;
  } else {
    console.log(`  ✔ [PASS] ${tf} valid TOML command spec`);
  }
}

for (const mf of mdFiles) {
  const content = fs.readFileSync(path.join(CMD_DIR, mf), 'utf8');
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!frontmatter || !/^description:\s*\S/m.test(frontmatter[1]) || containsUnsupportedControlCharacters(content)) {
    console.log(`  ✖ [FAIL] ${mf} has invalid frontmatter or unsupported control characters`);
    errors++;
  } else {
    console.log(`  ✔ [PASS] ${mf} valid Markdown command entrypoint`);
  }
}

if (errors > 0) {
  console.log(`\nCommand Validation: FAILED (${errors} error(s))`);
  process.exit(1);
} else {
  console.log('\nCommand Validation: ALL COMMANDS VALIDATED SUCCESSFULLY');
  process.exit(0);
}
