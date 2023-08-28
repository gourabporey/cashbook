const assert = require('assert');
const { describe, it } = require('node:test');
const UserRepository = require('../../src/repositories/user-repository');
const { expect, matchArg } = require('../test-utils');

describe('UserRepository', () => {
  describe('restore', () => {
    it('should restore the users details from the filesystem', (context) => {
      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(),
      };
      const userRepository = new UserRepository('user_data', fs, null);
      userRepository.restore();

      expect(fs.existsSync).toHaveBeenCalledTimes(1);
      expect(fs.existsSync).toHaveBeenCalledWith(matchArg('user_data'));
      expect(fs.readFileSync).toHaveBeenCalledTimes(1);
      expect(fs.readFileSync).toHaveBeenCalledWith(
        matchArg('user_data'),
        matchArg('utf8')
      );
    });
  });

  describe('toJSON', () => {
    it('should return the users in json', (context) => {
      const users = [
        { username: 'gourab', hashPassword: 'gourab845759' },
        { username: 'vidita', hashPassword: 'vidita845759' },
      ];
      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => JSON.stringify(users)),
      };

      const userRepository = new UserRepository('user_data', fs, null);
      userRepository.restore();

      assert.deepStrictEqual(userRepository.toJSON(), users);
    });
  });

  describe('addUser', () => {
    it('should add a new user with hashed password', (context) => {
      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => '[]'),
        writeFile: context.mock.fn((_, __, callback) => callback()),
      };
      const encryptor = {
        encrypt: context.mock.fn((password) => password),
      };

      const userRepository = new UserRepository('user_data', fs, encryptor);
      userRepository.restore();

      const sendToken = context.mock.fn();

      userRepository.addUser('gourab', 'gourab1234', sendToken);

      assert.deepStrictEqual(userRepository.toJSON(), [
        { username: 'gourab', hashPassword: 'gourab1234' },
      ]);
    });
  });

  describe('existsUser', () => {
    it('should return true when username exists', (context) => {
      const users = [
        { username: 'gourab', hashPassword: 'gourab845759' },
        { username: 'vidita', hashPassword: 'vidita845759' },
      ];
      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => JSON.stringify(users)),
      };
      const encryptor = {
        encrypt: context.mock.fn((password) => password),
      };

      const userRepository = new UserRepository('user_data', fs, encryptor);
      userRepository.restore();

      assert.ok(userRepository.existsUser('gourab'));
    });

    it("should return false when username doesn't exist", (context) => {
      const users = [
        { username: 'gourab', hashPassword: 'gourab845759' },
        { username: 'vidita', hashPassword: 'vidita845759' },
      ];
      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => JSON.stringify(users)),
      };
      const encryptor = {
        encrypt: context.mock.fn((password) => password),
      };

      const userRepository = new UserRepository('user_data', fs, encryptor);
      userRepository.restore();

      assert.ok(!userRepository.existsUser('sourav'));
    });
  });

  describe('validateCredentials', () => {
    it('should validate the username and password', (context) => {
      const users = [
        { username: 'gourab', hashPassword: 'gourab845759' },
        { username: 'vidita', hashPassword: 'vidita845759' },
      ];
      const fs = {
        existsSync: context.mock.fn(() => true),
        readFileSync: context.mock.fn(() => JSON.stringify(users)),
      };
      const encryptor = {
        encrypt: context.mock.fn((password) => password),
        match: context.mock.fn(
          (password, hashPassword) =>
            encryptor.encrypt(password) === hashPassword
        ),
      };

      const userRepository = new UserRepository('user_data', fs, encryptor);
      userRepository.restore();

      assert.deepStrictEqual(
        userRepository.validateCredentials({ username: 'sourov' }),
        { validUsername: false }
      );

      assert.deepStrictEqual(
        userRepository.validateCredentials({
          username: 'gourab',
          password: 'gourab845759',
        }),
        { validUsername: true, validPassword: true }
      );
    });
  });
});
