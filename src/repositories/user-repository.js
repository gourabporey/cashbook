const User = require('../models/user');

class UserRepository {
  #path;
  #fileSystem;
  #users;
  #encryptor;

  constructor(path, filesystem, encryptor) {
    this.#path = path;
    this.#encryptor = encryptor;
    this.#fileSystem = filesystem;
    this.#users = [];
  }

  restore() {
    if (!this.#fileSystem.existsSync(this.#path)) {
      this.#fileSystem.writeFileSync(this.#path, '[]');
    }

    this.#users = JSON.parse(
      this.#fileSystem.readFileSync(this.#path, 'utf8') || '[]'
    ).map((userData) => new User(userData));
  }

  toJSON() {
    return this.#users.map((user) => user.toJSON());
  }

  save(callback) {
    this.#fileSystem.writeFile(
      this.#path,
      JSON.stringify(this.toJSON()),
      (err) => callback(err)
    );
  }

  #findUser(username) {
    return this.#users.find((user) => user.username === username);
  }

  validateTokens({ username, hashPassword }) {
    return this.#users.some(
      (user) => user.username === username && user.hashPassword === hashPassword
    );
  }

  getToken(username) {
    return this.#findUser(username).hashPassword;
  }

  validateCredentials({ username, password }) {
    const user = this.#findUser(username);
    if (!user) return { validUsername: false };

    const { hashPassword } = user;
    const validPassword = this.#encryptor.match(password, hashPassword);
    return { validPassword, validUsername: true };
  }

  addUser(username, password, sendToken) {
    const hashPassword = this.#encryptor.encrypt(password);
    const newUser = new User({ username, hashPassword });
    this.#users.push(newUser);
    this.save((err) => sendToken(err, hashPassword));
  }

  existsUser(username) {
    return this.#users.findIndex((user) => user.username === username) !== -1;
  }
}

module.exports = UserRepository;
