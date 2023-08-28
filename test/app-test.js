const request = require('supertest');
const { describe, it } = require('node:test');

const { createApp } = require('../src/app.js');
const EntryRepository = require('../src/repositories/entry-repository.js');
const { generateId } = require('../src/id-generator.js');

describe('App', () => {
  describe('GET /', () => {
    it('should serve the homepage', (_, done) => {
      const entryRepository = null;
      const idGenerator = null;

      const app = createApp({ entryRepository, idGenerator });

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

      const app = createApp({ entryRepository, idGenerator: null });

      request(app)
        .get('/entries')
        .expect(200)
        .expect('content-type', /application\/json/)
        .expect(entries)
        .end(done);
    });
  });

  describe('POST /entries', () => {
    it('should create a new entry and give back a json of created resource', (context, done) => {
      const entries = [];

      const fs = {
        readFileSync: context.mock.fn(() => JSON.stringify(entries)),
        existsSync: context.mock.fn(() => true),
        writeFile: context.mock.fn(),
      };

      const entryRepository = new EntryRepository(null, fs, null);
      const idGenerator = generateId();

      const entryData = {
        type: 'expense',
        amount: 800,
        category: 'grocery',
        title: 'monday grocery',
        timeStamp: new Date().toUTCString(),
      };

      const expectedData = { ...entryData, id: 0, userId: 0 };

      const app = createApp({ entryRepository, idGenerator });

      request(app)
        .post('/entries')
        .set('cookie', ['userId=0'])
        .send(entryData)
        .expect(201)
        .expect('content-type', /application\/json/)
        .expect(expectedData)
        .end(done);
    });
  });

  describe('POST /entries/:id', () => {
    it('should change the entry as specified and redirect to home', (context, done) => {
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
      ];

      const fs = {
        readFileSync: context.mock.fn(() => JSON.stringify(entries)),
        existsSync: context.mock.fn(() => true),
        writeFile: context.mock.fn((_, __, callback) => callback()),
      };

      const entryRepository = new EntryRepository(null, fs, null);
      const idGenerator = generateId();

      const app = createApp({ entryRepository, idGenerator });

      request(app)
        .post('/entries/0')
        .send('amount=5000&title=tuesday+grocery')
        .expect(302)
        .end(done);
    });
  });

  describe('GET /signup', () => {
    it('should send the signup page', (_, done) => {
      const app = createApp({ entryRepository: null, idGenerator: null });

      request(app)
        .get('/signup')
        .expect(200)
        .expect('content-type', /text\/html/)
        .end(done);
    });
  });
});
