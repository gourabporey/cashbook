const assert = require('assert');
const { describe, it } = require('node:test');
const User = require('../../src/models/user');

describe('User', () => {
  describe('toJSON', () => {
    it('should return the username and password in json format', () => {
      const encryptedUserInfo = {
        username: 'gourab',
        hashPassword: 'asdfsdhfdffh',
      };
      const user = new User(encryptedUserInfo);

      assert.deepStrictEqual(user.toJSON(), encryptedUserInfo);
    });
  });
});
