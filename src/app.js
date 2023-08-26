const express = require('express');

const { cookieParser } = require('./middlewares/cookie-parser');
const { serveEntries, createEntry } = require('./handlers/entry-handlers');

const createApp = ({ entryRepository, idGenerator }) => {
  const app = express();

  app.entryRepository = entryRepository;
  app.idGenerator = idGenerator;

  app.use(cookieParser);
  app.use(express.json());

  app.get('/entries', serveEntries);
  app.post('/entries', createEntry);

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
