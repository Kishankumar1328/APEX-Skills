#!/usr/bin/env node
/** Runs deterministic framework checks and executable fixture tests. */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { runFixture } = require('./lib/fixture-runner');

const ROOT = path.resolve(__dirname, '..');
const report = {
  timestamp: new Date().toISOString(),
  executedChecks: [],
  offlineScenarioSpecificationValidation: { status: 'NOT_RUN' },
  executableFixtureTests: [],
  liveAgentBehaviorEvaluation: { status: 'NOT_RUN', reason: 'No model-backed evaluator or supported host invocation was configured for this run.' },
  platformInstallationAndInvocation: { status: 'NOT_RUN', reason: 'Antigravity, Codex CLI, Cursor, and Claude Code were not installed and invoked by this runner.' },
  overallStatus: 'PENDING'
};
const checks = [
  ['skillStructure', 'validate-apex-skills.js'], ['frameworkRegistry', 'validate-framework-registry.js'],
  ['commandDefinitions', 'validate-commands.js'], ['commandRouting', 'validate-command-routing.js'],
  ['platformMetadata', 'validate-platform-integrations.js'], ['platformAdapterMetadata', 'smoke-platform-adapters.js'],
  ['offlineScenarioSpecifications', 'validate-evals.js']
];
const fixtures = [
  ['sample-app', 'sample-app', ['node', '--test', 'tests/calculator.test.js'], [/tests 7/, /pass 7/, /fail 0/]],
  ['broken-code', 'broken-code', ['node', '--test', 'test.js'], [/tests 2/, /pass 2/, /fail 0/]],
  ['refactor-target', 'refactor-target', ['node', '--test', 'test.js'], [/tests 3/, /pass 3/, /fail 0/]],
  ['api-service', 'api-service', ['node', '--test', 'test.js'], [/tests 3/, /pass 3/, /fail 0/]]
];
function runCheck(name, script) {
  const result = spawnSync(process.execPath, [path.join(__dirname, script)], { cwd: ROOT, encoding: 'utf8', shell: false });
  const status = result.error || result.status !== 0 ? 'FAILED' : 'PASSED';
  const output = `${result.stdout || ''}${result.stderr || ''}`.trim();
  report.executedChecks.push({ name, command: `node scripts/${script}`, status, exitCode: result.status, output });
  console.log(`${status === 'PASSED' ? 'PASS' : 'FAIL'} ${name}`);
  if (output) console.log(output);
  return status;
}
console.log('APEX FRAMEWORK OFFLINE EVALUATION SUITE');
for (const [name, script] of checks) runCheck(name, script);
const scenario = report.executedChecks.find(check => check.name === 'offlineScenarioSpecifications');
report.offlineScenarioSpecificationValidation = { status: scenario.status, command: scenario.command, note: 'Offline schema and prompt-expectation checks only; no agent was executed.' };
for (const [name, directory, command, requiredOutput] of fixtures) {
  const result = runFixture({ name, cwd: path.join(ROOT, 'evals', 'fixtures', directory), command, expectedExitCode: 0, requiredOutput });
  report.executableFixtureTests.push({ name, command: command.join(' '), status: result.passed ? 'PASSED' : 'FAILED', exitCode: result.exitCode, assertions: requiredOutput.map(pattern => pattern.source), errors: result.errors, output: result.output.trim() });
  console.log(`${result.passed ? 'PASS' : 'FAIL'} fixture:${name}`);
  if (!result.passed) result.errors.forEach(error => console.error(`  - ${error}`));
}
const checksPassed = report.executedChecks.every(check => check.status === 'PASSED');
const fixturesPassed = report.executableFixtureTests.every(test => test.status === 'PASSED');
report.overallStatus = checksPassed && fixturesPassed ? 'PASSED_OFFLINE' : 'FAILED';
fs.writeFileSync(path.join(ROOT, 'evals', 'evaluation-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(`Live agent behavior: ${report.liveAgentBehaviorEvaluation.status}`);
console.log(`Platform installation/invocation: ${report.platformInstallationAndInvocation.status}`);
console.log(`Overall offline result: ${report.overallStatus}`);
process.exit(report.overallStatus === 'PASSED_OFFLINE' ? 0 : 1);
