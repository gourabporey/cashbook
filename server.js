const fs = require('fs');
const crypto = require('node:crypto');

const { createApp } = require('./src/app');
const EntryRepository = require('./src/repositories/entry-repository');
const { generateId } = require('./src/id-generator');
const UserRepository = require('./src/repositories/user-repository');
const Encryptor = require('./src/models/encryptor');
const { ENTRY_PATH, USERS_PATH, PORT } = require('./config');

const main = () => {
  const encryptor = new Encryptor(crypto);
  const entryRepository = new EntryRepository(ENTRY_PATH, fs, console);
  const userRepository = new UserRepository(USERS_PATH, fs, encryptor);
  userRepository.restore();

  const idGenerator = generateId();

  const app = createApp({ entryRepository, idGenerator, userRepository });
  app.listen(PORT, () => console.log('started listening on port', PORT));
};

main();
