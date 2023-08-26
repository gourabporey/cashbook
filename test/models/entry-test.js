const assert = require('assert');
const { describe, it } = require('node:test');
const Entry = require('../../src/models/entry');

describe('Entry', () => {
  describe('modify', () => {
    it('should should not modify when no new Data is given', () => {
      const entryData = {
        id: 0,
        userId: 0,
        type: 'income',
        amount: 100,
        category: 'groceries',
        title: 'Monday groceries',
      };

      const entry = new Entry(entryData);

      assert.deepStrictEqual(entry.modify({}).toJSON(), entryData);
    });

    it('should should modify properties when valid data is given', () => {
      const entryData = {
        id: 0,
        userId: 0,
        type: 'income',
        amount: 100,
        category: 'groceries',
        title: 'Monday groceries',
      };

      const entry = new Entry(entryData);
      const newData = { amount: 500, title: 'tuesday groceries' };

      const expectedData = {
        id: 0,
        userId: 0,
        type: 'income',
        amount: 500,
        category: 'groceries',
        title: 'tuesday groceries',
      };

      assert.deepStrictEqual(entry.modify(newData).toJSON(), expectedData);
    });
  });
});
