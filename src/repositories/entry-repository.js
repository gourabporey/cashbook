const Entry = require('../models/entry');

class EntryRepository {
  #fs;
  #path;
  #entries;

  constructor(path, fs) {
    this.#fs = fs;
    this.#path = path;
  }

  #deserializeEntries() {
    const data = this.#fs.readFileSync(this.#path, 'utf-8');
    const rawEntries = JSON.parse(data || '[]');
    return rawEntries.map((entryInfo) => new Entry(entryInfo));
  }

  getAll() {
    if (this.#entries) return this.#entries;

    this.#entries = this.#fs.existsSync(this.#path)
      ? this.#deserializeEntries()
      : [];

    return this.#entries;
  }

  findEntries(options) {
    const { userId } = options;
    const entries = this.getAll().filter(
      (entry) => entry.getUserId() === userId
    );
    return entries.map((entry) => entry.toJSON());
  }
}

module.exports = EntryRepository;
