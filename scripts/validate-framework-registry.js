#!/usr/bin/env node
/**
 * Validates canonical specialist definitions, derived Antigravity copies,
 * registered evaluation coverage, and intentionally standalone agent files.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'framework-registry.json'), 'utf8'));
const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8').replace(/\r\n/g, '\n').trimEnd();
}

function exists(relativePath) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function canonicalSpecialistPath(name) {
  for (const [orchestrator, definition] of Object.entries(registry.orchestrators)) {
    if (definition.specialists.includes(name)) {
      return `skills/${orchestrator}/specialists/${name}.md`;
    }
  }
  return null;
}

const registeredSpecialists = Object.values(registry.orchestrators)
  .flatMap(definition => definition.specialists);
const canonicalFiles = [
  ...fs.readdirSync(path.join(ROOT, 'skills', 'developer-skill', 'specialists')),
  ...fs.readdirSync(path.join(ROOT, 'skills', 'testing-skill', 'specialists'))
].filter(file => file.endsWith('.md')).map(file => path.basename(file, '.md'));

for (const specialist of registeredSpecialists) {
  const canonical = canonicalSpecialistPath(specialist);
  const derived = `.agents/skills/${specialist}/SKILL.md`;
  if (!exists(canonical)) errors.push(`Missing canonical specialist: ${canonical}`);
  if (!exists(derived)) {
    errors.push(`Missing derived specialist copy: ${derived}`);
  } else if (exists(canonical) && read(canonical) !== read(derived)) {
    errors.push(`Derived specialist differs from canonical source: ${specialist}`);
  }
  const casePath = Object.values(registry.orchestrators).find(definition => definition.specialists.includes(specialist)) === registry.orchestrators['developer-skill']
    ? `evals/cases/developer-specialists/${specialist}.json`
    : `evals/cases/testing-specialists/${specialist}.json`;
  if (!exists(casePath)) errors.push(`Missing evaluation case for registered specialist: ${casePath}`);
}

for (const specialist of canonicalFiles) {
  if (!registeredSpecialists.includes(specialist)) {
    errors.push(`Unregistered canonical specialist definition: ${specialist}`);
  }
}

for (const [name, definition] of Object.entries(registry.orchestrators)) {
  if (!exists(definition.canonical)) errors.push(`Missing canonical orchestrator: ${definition.canonical}`);
  for (const derived of definition.derived) {
    if (!exists(derived)) {
      errors.push(`Missing derived orchestrator copy: ${derived}`);
      continue;
    }
    const canonical = read(definition.canonical);
    const copy = read(derived);
    const expectedName = path.basename(path.dirname(derived));
    const normalizedCopy = copy.replace(/^name:\s*[^\r\n]+/m, `name: ${name}`);
    const normalizedCanonical = canonical.replace(/^name:\s*[^\r\n]+/m, `name: ${name}`);
    if (normalizedCopy !== normalizedCanonical) {
      errors.push(`Derived orchestrator differs from canonical source: ${derived}`);
    }
    if (!expectedName) errors.push(`Invalid derived orchestrator path: ${derived}`);
  }
}

if (errors.length) {
  console.error('Framework registry validation failed:');
  errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}

console.log(`Framework registry validation passed (${registeredSpecialists.length} registered specialists).`);
