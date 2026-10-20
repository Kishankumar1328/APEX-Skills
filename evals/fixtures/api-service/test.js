
const { test } = require('node:test');
const assert = require('node:assert');
const { handleProfileRequest } = require('./service');

test('returns 401 when token missing', () => {
  const res = handleProfileRequest({}, { userId: '123' });
  assert.strictEqual(res.status, 401);
});

test('returns 400 when userId missing', () => {
  const res = handleProfileRequest({ authorization: 'Bearer abc' }, {});
  assert.strictEqual(res.status, 400);
});

test('returns 200 on valid request', () => {
  const res = handleProfileRequest({ authorization: 'Bearer abc' }, { userId: '123' });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.userId, '123');
});
