#!/usr/bin/env node
/**
 * validate-evals.js
 * Validates that all evals/cases/*.json files comply with the eval schema.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CASES_DIR = path.join(ROOT_DIR, 'evals', 'cases');

console.log('=== Validating Evaluation Cases Schema ===\n');
let total = 0;
let errors = 0;
const seenIds = new Set();

function validateScenario(data, scenario, fileName) {
  const id = String(scenario.id ?? '');
  const hasRequiredText = ['prompt', 'expected_output'].every(field =>
    typeof scenario[field] === 'string' && scenario[field].trim().length > 0
  );
  const hasExpectations = Array.isArray(scenario.expectations) && scenario.expectations.length > 0 &&
    scenario.expectations.every(expectation => typeof expectation === 'string' && expectation.trim().length > 0);
  const caseKey = `${data.agent || data.skill_name}:${id}`;
  if (!id || !hasRequiredText || !hasExpectations) {
    return `${fileName}: scenario '${id || 'unknown'}' requires a non-empty id, prompt, expected_output, and expectations`;
  }
  if (seenIds.has(caseKey)) {
    return `${fileName}: duplicate scenario id '${caseKey}'`;
  }
  seenIds.add(caseKey);
  return null;
}

function checkCaseDir(dirPath, label) {
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
  for (const f of files) {
    total++;
    const p = path.join(dirPath, f);
    try {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      const hasTrigger = data.trigger && Array.isArray(data.trigger.positive) && Array.isArray(data.trigger.negative);
      const hasEvals = Array.isArray(data.evals) && data.evals.length >= 1;
      if (!hasTrigger || !hasEvals) {
        console.log(`  ✖ [FAIL] [${label}] ${f}: invalid trigger or evals array`);
        errors++;
      } else {
        const scenarioErrors = data.evals.map(scenario => validateScenario(data, scenario, f)).filter(Boolean);
        if (scenarioErrors.length) {
          scenarioErrors.forEach(error => console.log(`  ✖ [FAIL] [${label}] ${error}`));
          errors += scenarioErrors.length;
        } else {
          console.log(`  ✔ [PASS] [${label}] ${f} (${data.evals.length} eval scenario(s))`);
        }
      }
    } catch (e) {
      console.log(`  ✖ [FAIL] [${label}] ${f}: JSON syntax error - ${e.message}`);
      errors++;
    }
  }
}

checkCaseDir(CASES_DIR, 'Orchestrator');
checkCaseDir(path.join(CASES_DIR, 'developer-specialists'), 'Dev Specialist');
checkCaseDir(path.join(CASES_DIR, 'testing-specialists'), 'Test Specialist');

console.log(`\nTotal Cases Checked: ${total} | Errors: ${errors}`);
if (errors > 0) {
  process.exit(1);
} else {
  console.log('All Evaluation Case Schemas are Valid.');
  process.exit(0);
}
