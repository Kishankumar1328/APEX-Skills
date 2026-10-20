
const { test } = require('node:test');
const assert = require('node:assert');
const { calculateDiscounts } = require('./pricing');

test('VIP receives 20% discount', () => {
  assert.strictEqual(calculateDiscounts([{ price: 100 }, { price: 50 }], 'VIP'), 120);
});

test('MEMBER receives 10% discount', () => {
  assert.strictEqual(calculateDiscounts([{ price: 100 }, { price: 50 }], 'MEMBER'), 135);
});

test('Standard receives 0% discount', () => {
  assert.strictEqual(calculateDiscounts([{ price: 100 }, { price: 50 }], 'GUEST'), 150);
});
