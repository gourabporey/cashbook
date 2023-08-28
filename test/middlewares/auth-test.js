const assert = require('assert');
const { describe, it } = require('node:test');
const { validateCredentials } = require('../../src/middlewares/auth');

describe('validateCredentials', () => {
  it('should call the next function when valid credentials are provided in request body', (context) => {
    const req = {
      body: { name: 'gourab', email: 'gourab@gmail.com', password: 'gourab' },
    };
    const res = {
      status: context.mock.fn(() => this),
      next: context.mock.fn(),
    };
    const next = context.mock.fn();

    validateCredentials(req, res, next);

    assert.strictEqual(next.mock.callCount(), 1);
  });

  it('should call the res.end and status function when invalid credentials are provided in request body', (context) => {
    const req = {
      body: { name: 'gourab', email: 'gourab', password: 'gourab' },
    };

    const res = { end: context.mock.fn(), status: context.mock.fn(() => res) };

    const next = context.mock.fn();

    validateCredentials(req, res, next);

    assert.strictEqual(next.mock.callCount(), 0);
    assert.strictEqual(res.status.mock.callCount(), 1);
    assert.deepStrictEqual(res.status.mock.calls[0].arguments, [400]);
    assert.strictEqual(res.end.mock.callCount(), 1);
  });
});
