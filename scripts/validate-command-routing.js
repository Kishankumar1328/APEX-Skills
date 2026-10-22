#!/usr/bin/env node
/**
 * Ensures every shipped command routes to a documented specialist or
 * orchestrator and that every referenced entry point exists.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'framework-registry.json'), 'utf8'));
const requiredRoutes = {
  'develop.toml': ['developer-skill', 'coding-agent', 'debugging-agent'],
  'test.toml': ['testing-skill'],
  'review.toml': ['code-review-agent'],
  'debug.toml': ['debugging-agent'],
  'qa-summary.toml': ['complete-qa-agent']
};
const errors = [];
const registeredSpecialists = Object.entries(registry.orchestrators).flatMap(([orchestrator, definition]) =>
  definition.specialists.map(specialist => [specialist, orchestrator])
);

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

for (const [command, routes] of Object.entries(requiredRoutes)) {
  const commandPath = path.join(ROOT, 'commands', command);
  if (!fs.existsSync(commandPath)) {
    errors.push(`Missing command definition: commands/${command}`);
    continue;
  }
  const content = fs.readFileSync(commandPath, 'utf8');
  for (const route of routes) {
    if (!content.includes(route)) {
      errors.push(`commands/${command} does not reference required route '${route}'`);
    }
  }
}

for (const skill of ['developer-skill', 'testing-skill']) {
  if (!exists(`skills/${skill}/SKILL.md`)) {
    errors.push(`Missing skill entry point: skills/${skill}/SKILL.md`);
  }
}

for (const [specialist, directory] of registeredSpecialists) {
  if (!exists(`skills/${directory}/specialists/${specialist}.md`)) {
    errors.push(`Missing specialist definition: ${specialist}`);
  }
}

if (errors.length) {
  console.error('Command routing validation failed:');
  errors.forEach(error => console.error(`  - ${error}`));
  process.exit(1);
}

console.log('Command routing validation passed.');
