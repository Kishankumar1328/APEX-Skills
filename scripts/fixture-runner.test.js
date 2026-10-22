const test = require('node:test');
const assert = require('node:assert/strict');
const { runFixture } = require('./lib/fixture-runner');

const fixture = {
  command: ['node', '--test', 'test.js'],
  cwd: process.cwd(),
  expectedExitCode: 0,
  requiredOutput: [/tests 2/]
};

test('accepts a fixture only when its exit code and assertions match', () => {
  const result = runFixture(fixture, {
    execute: () => ({ status: 0, stdout: 'tests 2\n', stderr: '' })
  });
  assert.equal(result.passed, true);
});

test('rejects an unexpected command failure instead of treating it as a pass', () => {
  const result = runFixture(fixture, {
    execute: () => ({ status: 1, stdout: '', stderr: 'Cannot find test.js' })
  });
  assert.equal(result.passed, false);
  assert.match(result.errors.join('\n'), /expected exit 0, received 1/);
});
