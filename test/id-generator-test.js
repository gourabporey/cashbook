const assert = require('assert');
const { describe, it } = require('node:test');
const { generateId } = require('../src/id-generator');

describe('generateId', () => {
  it('should generate ids incrementing one', () => {
    const generator = generateId();
    assert.deepStrictEqual(generator.next(), { value: 0, done: false });
    assert.deepStrictEqual(generator.next(), { value: 1, done: false });
  });
});
