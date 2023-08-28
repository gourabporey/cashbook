const assert = require('assert');
const crypto = require('node:crypto');
const { describe, it } = require('node:test');

const Encryptor = require('../../src/models/encryptor');
const { expect, matchArg } = require('../test-utils');

describe('Encryptor', () => {
  describe('encrypt', () => {
    it('it should return the hex digested hashPassword', (context) => {
      const mockCrypto = {
        createHash: context.mock.fn(() => mockCrypto),
        digest: context.mock.fn(() => 'hello'),
        update: context.mock.fn(() => mockCrypto),
      };

      const encryptor = new Encryptor(mockCrypto);
      const password = encryptor.encrypt('something');

      assert.strictEqual(password, 'hello');

      expect(mockCrypto.createHash).toHaveBeenCalledWith(matchArg('sha256'));
      expect(mockCrypto.update).toHaveBeenCalledWith(matchArg('something'));
      expect(mockCrypto.digest).toHaveBeenCalledWith(matchArg('hex'));
    });
  });

  describe('match', () => {
    it('should match if valid password and hash are given', () => {
      const encryptor = new Encryptor(crypto);
      const password = 'something';
      const hashPassword = encryptor.encrypt(password);

      assert.ok(encryptor.match(password, hashPassword));
    });

    it('should not match for any invalid password', () => {
      const encryptor = new Encryptor(crypto);
      const password = 'something';
      const wrongPassword = 'something wrong';
      const hashPassword = encryptor.encrypt(password);

      assert.ok(!encryptor.match(wrongPassword, hashPassword));
    });
  });
});
