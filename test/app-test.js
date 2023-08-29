const request = require('supertest');
const { describe, it } = require('node:test');

const { createApp } = require('../src/app.js');
const { generateId } = require('../src/id-generator.js');

describe('App', () => {
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

      const entryRepository = { findEntries: () => entries };
      const userRepository = { validateTokens: () => true };

      const app = createApp({
        entryRepository,
        idGenerator: null,
        userRepository,
      });

      request(app)
        .get('/entries')
        .set('cookie', ['authToken=567', 'username=gourab'])
        .expect(200)
        .expect('content-type', /application\/json/)
        .expect(entries)
        .end(done);
    });
  });

  describe('POST /entries', () => {
    it('should create a new entry and give back a json of created resource', (context, done) => {
      const idGenerator = generateId();
      const userRepository = { validateTokens: () => true };
      const entryRepository = { addEntry: context.mock.fn() };

      const entryData = {
        id: Date.now(),
        type: 'expense',
        amount: 800,
        category: 'grocery',
        title: 'monday grocery',
        timeStamp: new Date().toUTCString(),
      };

      const app = createApp({ entryRepository, idGenerator, userRepository });

      request(app)
        .post('/entries')
        .send(entryData)
        .set('cookie', ['authToken=567', 'username=gourab'])
        .expect(201)
        .expect('content-type', /application\/json/)
        .end(done);
    });
  });

  describe('GET /entries/:id/edit', () => {
    it('should serve the edit page', (context, done) => {
      const idGenerator = generateId();
      const userRepository = { validateTokens: () => true };
      const entryRepository = { addEntry: context.mock.fn() };

      const app = createApp({ entryRepository, idGenerator, userRepository });

      request(app)
        .get('/entries/0/edit')
        .set('cookie', ['authToken=567', 'username=gourab'])
        .expect(200)
        .expect('content-type', /text\/html/)
        .end(done);
    });
  });

  describe('POST /entries/:id', () => {
    it('should change the entry as specified and redirect to home', (context, done) => {
      const entryRepository = {
        modifyEntry: context.mock.fn((id, data, callback) => callback()),
      };
      const userRepository = { validateTokens: () => true };
      const idGenerator = generateId();

      const app = createApp({ entryRepository, idGenerator, userRepository });

      request(app)
        .post('/entries/0')
        .send('amount=5000&title=tuesday+grocery')
        .expect(302)
        .end(done);
    });
  });

  describe('DELETE /entries/:id', () => {
    it('should delete the entry specified by the id', (context, done) => {
      const idGenerator = generateId();
      const userRepository = { validateTokens: () => true };
      const entryRepository = {
        deleteEntryOfId: context.mock.fn((id, callback) => callback()),
      };

      const app = createApp({ entryRepository, idGenerator, userRepository });

      request(app)
        .delete('/entries/0')
        .set('cookie', ['authToken=567', 'username=gourab'])
        .expect(204)
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

  describe('POST /signup', () => {
    it('should successfully signup a new user', (context, done) => {
      const addUser = context.mock.fn((_, __, callback) => callback(false));
      const userRepository = {
        existsUser: context.mock.fn(() => false),
        addUser,
        getToken: context.mock.fn(),
      };

      const app = createApp({
        entryRepository: null,
        idGenerator: null,
        userRepository,
      });

      request(app)
        .post('/signup')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send('username=gourab&password=1234')
        .expect(302)
        .end(done);
    });
  });

  describe('GET /login', () => {
    it('should serve the login page', (_, done) => {
      const app = createApp({});
      request(app)
        .get('/login')
        .expect(200)
        .expect('content-type', /text\/html/)
        .end(done);
    });
  });

  describe('POST /login', () => {
    it('should successfully log in a user and set cookies', (context, done) => {
      const userRepository = {
        validateCredentials: context.mock.fn(() => ({
          validUsername: true,
          validPassword: true,
        })),

        getToken: () => 'authToken',
      };

      const app = createApp({
        entryRepository: null,
        idGenerator: null,
        userRepository,
      });

      request(app)
        .post('/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send('username=gourab&password=1234')
        .expect(302)
        .expect('set-cookie', /username=gourab/)
        .expect('set-cookie', /authToken=/)
        .end(done);
    });
  });
});
