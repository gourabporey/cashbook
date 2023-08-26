const Entry = require('../models/entry');

class EntryRepository {
  #fs;
  #path;
  #entries;

  constructor(path, fs) {
    this.#fs = fs;
    this.#path = path;
    this.#entries = [];
  }

  getAll() {
    if (this.#fs.existsSync(this.#path)) {
      const data = this.#fs.readFileSync(this.#path, 'utf-8');
      const rawEntries = JSON.parse(data || '[]');
      this.#entries = rawEntries.map((entryInfo) => new Entry(entryInfo));
    }

    return this.#entries;
  }
}

module.exports = EntryRepository;
