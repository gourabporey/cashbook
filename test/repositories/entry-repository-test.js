const assert = require('assert');
const { describe, it } = require('node:test');
const EntryRepository = require('../../src/repositories/entry-repository');
const Entry = require('../../src/models/entry');

describe('EntryRepository', () => {
  describe('getAll', () => {
    it('should get all entries', (context) => {
      const firstEntry = {
        id: 0,
        timeStamp: new Date().toUTCString(),
        type: 'income',
        amount: 800,
        userId: 567,
        category: 'grocery',
        title: 'monday grocery',
      };

      const secondEntry = {
        id: 0,
        timeStamp: new Date().toUTCString(),
        type: 'income',
        amount: 800,
        userId: 567,
        category: 'grocery',
        title: 'monday grocery',
      };

      const storedEntries = [firstEntry, secondEntry];

      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => JSON.stringify(storedEntries)),
      };

      const entryRepo = new EntryRepository(null, fs);

      const actualEntries = entryRepo.getAll();

      const expectedFirstEntry = new Entry(firstEntry);
      const expectedSecondEntry = new Entry(secondEntry);

      actualEntries.forEach((entry) => {
        assert.ok(entry instanceof Entry);
      });

      assert.deepStrictEqual(expectedFirstEntry.toJSON(), firstEntry);
      assert.deepStrictEqual(expectedSecondEntry.toJSON(), secondEntry);
    });
  });
});
