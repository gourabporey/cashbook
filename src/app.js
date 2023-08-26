const express = require('express');

const { serveEntries } = require('./handlers/entry-handlers');

const createApp = ({ entryRepository }) => {
  const app = express();

  app.entryRepository = entryRepository;

  app.get('/entries', serveEntries);

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
