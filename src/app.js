const express = require('express');

const { cookieParser } = require('./middlewares/cookie-parser');
const {
  serveEntries,
  createEntry,
  editEntry,
  serveEditPage,
} = require('./handlers/entry-handlers');
const { logger } = require('./middlewares/logger');

const createApp = ({ entryRepository, idGenerator }) => {
  const app = express();

  app.entryRepository = entryRepository;
  app.idGenerator = idGenerator;

  app.use(cookieParser);
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(logger);

  app.get('/entries', serveEntries);
  app.post('/entries', createEntry);
  app.post('/entries/:id', editEntry);
  app.get('/entries/:id/edit', serveEditPage);

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
