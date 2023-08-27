const fs = require('fs');

const { createApp } = require('./src/app');
const EntryRepository = require('./src/repositories/entry-repository');
const { generateId } = require('./src/id-generator');

const main = () => {
  const ENTRY_PATH = './data/entries.json';
  const entryRepository = new EntryRepository(ENTRY_PATH, fs, console);

  const idGenerator = generateId();

  const app = createApp({ entryRepository, idGenerator });
  const PORT = 8000;
  app.listen(PORT, () => console.log('started listening on port', PORT));
};

main();
