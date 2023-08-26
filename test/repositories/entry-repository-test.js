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

  describe('findEntries', () => {
    it('should find the entries of a specific user', (context) => {
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
        id: 1,
        timeStamp: new Date().toUTCString(),
        type: 'income',
        amount: 800,
        userId: 50,
        category: 'grocery',
        title: 'monday grocery',
      };

      const storedEntries = [firstEntry, secondEntry];

      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => JSON.stringify(storedEntries)),
      };

      const entryRepo = new EntryRepository(null, fs);
      entryRepo.getAll();

      const actualEntries = entryRepo.findEntries({ userId: 50 });

      assert.deepStrictEqual(actualEntries, [secondEntry]);
    });
  });

  describe('deleteEntryOfId', () => {
    it('should delete the entry and update the database', (context) => {
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
        id: 1,
        timeStamp: new Date().toUTCString(),
        type: 'income',
        amount: 800,
        userId: 50,
        category: 'grocery',
        title: 'monday grocery',
      };

      const storedEntries = [firstEntry, secondEntry];

      const fs = {
        existsSync: context.mock.fn(() => true),
        writeFile: context.mock.fn((path, content, callback) => callback()),
        readFileSync: context.mock.fn(() => JSON.stringify(storedEntries)),
      };

      const entryRepo = new EntryRepository(null, fs);

      entryRepo.deleteEntryOfId(0);

      assert.deepStrictEqual(entryRepo.serializeEntries(), [secondEntry]);
    });
  });

  describe('addEntry', () => {
    it('should add a new entry to the existing list', (context) => {
      const entryData = {
        id: 0,
        timeStamp: new Date().toUTCString(),
        type: 'income',
        amount: 800,
        userId: 567,
        category: 'grocery',
        title: 'monday grocery',
      };

      const fs = {
        existsSync: context.mock.fn(() => true),
        writeFile: context.mock.fn((path, content, callback) => callback()),
        readFileSync: context.mock.fn(() => JSON.stringify([entryData])),
      };

      const entryRepo = new EntryRepository(null, fs);

      entryRepo.addEntry(new Entry(entryData));

      assert.deepStrictEqual(entryRepo.serializeEntries(), [entryData]);
    });
  });
});
