const { spawnSync } = require('child_process');

function runFixture(fixture, options = {}) {
  const execute = options.execute || ((command, args, spawnOptions) => spawnSync(command, args, spawnOptions));
  const [command, ...args] = fixture.command;
  const result = execute(command, args, {
    cwd: fixture.cwd,
    encoding: 'utf8',
    shell: false
  });
  const stdout = result.stdout || '';
  const stderr = result.stderr || '';
  const output = `${stdout}${stderr}`;
  const errors = [];

  if (result.error) errors.push(`process error: ${result.error.message}`);
  if (result.status !== fixture.expectedExitCode) {
    errors.push(`expected exit ${fixture.expectedExitCode}, received ${result.status}`);
  }
  for (const pattern of fixture.requiredOutput || []) {
    if (!pattern.test(output)) errors.push(`missing expected output: ${pattern}`);
  }
  for (const pattern of fixture.forbiddenOutput || []) {
    if (pattern.test(output)) errors.push(`unexpected output: ${pattern}`);
  }

  return {
    passed: errors.length === 0,
    errors,
    exitCode: result.status,
    output
  };
}

module.exports = { runFixture };
