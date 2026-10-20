const { test } = require('node:test');
const assert = require('node:assert');
const { add, divide, subtract, multiply } = require('../src/calculator');

test('add() adds two numbers', () => {
  assert.strictEqual(add(2, 3), 5);
});

test('divide() divides two numbers', () => {
  assert.strictEqual(divide(10, 2), 5);
});

test('divide() throws on division by zero', () => {
  assert.throws(() => divide(10, 0), /Division by zero/);
});

test('multiply() multiplies two numbers', () => {
  assert.strictEqual(multiply(4, 5), 20);
});

test('multiply() throws on non-number inputs', () => {
  assert.throws(() => multiply('4', 5), /Inputs must be numbers/);
});

test('subtract() subtracts two numbers', () => {
  assert.strictEqual(subtract(10, 4), 6);
});

test('subtract() throws TypeError on non-number', () => {
  assert.throws(() => subtract(null, 5), /Inputs must be numbers/);
});
