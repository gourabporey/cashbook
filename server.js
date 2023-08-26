const { createApp } = require('./src/app');

const main = () => {
  const app = createApp();
  const PORT = 8000;
  app.listen(PORT, () => console.log('started listening on port', PORT));
};

main();
