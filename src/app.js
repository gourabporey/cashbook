const express = require('express');

const createApp = () => {
  const app = express();

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
