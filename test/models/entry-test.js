const assert = require('assert');
const { describe, it } = require('node:test');
const Entry = require('../../src/models/entry');

describe('Entry', () => {
  describe('modify', () => {
    it('should not modify when no new Data is given', () => {
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

    it('should modify properties when valid data is given', () => {
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

    it('should neglect invalid data when mixed data is given', () => {
      const entryData = {
        id: 0,
        userId: 0,
        type: 'income',
        amount: 100,
        category: 'groceries',
        title: 'Monday groceries',
      };

      const entry = new Entry(entryData);
      const newData = {
        amount: 500,
        title: 'tuesday groceries',
        random: 'this is a random data',
      };

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

  describe('getId', () => {
    it('should return the id of the entry', () => {
      const entry = new Entry({ id: 0 });
      assert.strictEqual(entry.getId(), 0);
    });
  });
});
