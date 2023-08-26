const request = require('supertest');
const { describe, it } = require('node:test');

const { createApp } = require('../src/app.js');

describe('App', () => {
  describe('GET /', () => {
    it('should serve the homepage', (_, done) => {
      const app = createApp();
      request(app)
        .get('/')
        .expect(200)
        .expect('content-type', /text\/html/)
        .end(done);
    });
  });
});
