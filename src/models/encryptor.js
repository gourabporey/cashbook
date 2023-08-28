class Encryptor {
  #crypto;

  constructor(crypto) {
    this.#crypto = crypto;
  }

  encrypt(password) {
    return this.#crypto.createHash('sha256').update(password).digest('hex');
  }

  match(password, hashPassword) {
    return this.encrypt(password) === hashPassword;
  }
}

module.exports = Encryptor;
