const request = require('supertest');
const { describe, it } = require('node:test');

const { createApp } = require('../src/app.js');
const EntryRepository = require('../src/repositories/entry-repository.js');

describe('App', () => {
  describe('GET /', () => {
    it('should serve the homepage', (_, done) => {
      const entryRepository = null;

      const app = createApp({ entryRepository });

      request(app)
        .get('/')
        .expect(200)
        .expect('content-type', /text\/html/)
        .end(done);
    });
  });

  describe('GET /entries', () => {
    it('should serve all the entries', (context, done) => {
      const entries = [
        {
          id: 0,
          timeStamp: new Date().toUTCString(),
          type: 'income',
          amount: 800,
          userId: 567,
          category: 'grocery',
          title: 'monday grocery',
        },
        {
          id: 1,
          timeStamp: new Date().toUTCString(),
          type: 'expense',
          amount: 800,
          userId: 567,
          category: 'grocery',
          title: 'monday grocery',
        },
      ];

      const fs = {
        readFileSync: context.mock.fn(() => JSON.stringify(entries)),
        existsSync: context.mock.fn(() => true),
      };

      const entryRepository = new EntryRepository(null, fs, null);

      const app = createApp({ entryRepository });

      request(app)
        .get('/entries')
        .expect(200)
        .expect('content-type', /application\/json/)
        .expect(entries)
        .end(done);
    });
  });
});
