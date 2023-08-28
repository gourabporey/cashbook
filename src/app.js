const express = require('express');

const { cookieParser } = require('./middlewares/cookie-parser');
const {
  serveEntries,
  createEntry,
  editEntry,
  serveEditPage,
  deleteEntry,
} = require('./handlers/entry-handlers');
const { logger } = require('./middlewares/logger');
const { serveSignupPage, validateCredentials } = require('./middlewares/auth');
const { signupUser } = require('./handlers/auth-handlers');

const createApp = ({ entryRepository, idGenerator, userRepository }) => {
  const app = express();

  app.entryRepository = entryRepository;
  app.idGenerator = idGenerator;
  app.userRepository = userRepository;

  app.use(cookieParser);
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(logger);

  app.get('/entries', serveEntries);
  app.post('/entries', createEntry);
  app.post('/entries/:id', editEntry);
  app.delete('/entries/:id', deleteEntry);
  app.get('/entries/:id/edit', serveEditPage);

  app.get('/signup', serveSignupPage);
  app.post('/signup', validateCredentials, signupUser);

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
