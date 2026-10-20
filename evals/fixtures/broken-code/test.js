
const { test } = require('node:test');
const assert = require('node:assert');
const { parseUserData } = require('./index');

test('parses valid user data', () => {
  assert.strictEqual(parseUserData({ profile: { name: 'Alice' } }), 'ALICE');
});

test('handles null safely (currently broken)', (t) => {
  // Deliberately triggers unhandled error to exercise debugging-agent
  assert.throws(() => parseUserData(null), /TypeError/);
});
