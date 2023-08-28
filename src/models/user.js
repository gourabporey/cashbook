class User {
  #username;
  #hashPassword;

  constructor({ username, hashPassword }) {
    this.#username = username;
    this.#hashPassword = hashPassword;
  }

  get username() {
    return this.#username;
  }

  get hashPassword() {
    return this.#hashPassword;
  }

  toJSON() {
    return {
      username: this.#username,
      hashPassword: this.#hashPassword,
    };
  }
}

module.exports = User;
