const Entry = require('../models/entry');

const matchId = (id) => (entry) => entry.getId() === id;
const matchUserId = (userId) => (entry) => entry.getUserId() === userId;
const entryToJSON = (entry) => entry.toJSON();

class EntryRepository {
  #fs;
  #path;
  #logger;
  #entries;

  constructor(path, fs, logger = console) {
    this.#fs = fs;
    this.#path = path;
    this.#logger = logger;
  }

  #deserializeEntries() {
    const data = this.#fs.readFileSync(this.#path, 'utf-8');
    const rawEntries = JSON.parse(data || '[]');
    return rawEntries.map((entryInfo) => new Entry(entryInfo));
  }

  serializeEntries() {
    return (this.#entries || []).map(entryToJSON);
  }

  #update() {
    const entries = this.serializeEntries();

    this.#fs.writeFile(this.#path, JSON.stringify(entries), (err) => {
      if (err) this.#logger.log(err);
    });
  }

  getAll() {
    if (this.#entries) return this.#entries;

    this.#entries = this.#fs.existsSync(this.#path)
      ? this.#deserializeEntries()
      : [];

    return this.#entries;
  }

  addEntry(entry) {
    this.#entries = this.#entries || [];
    this.#entries.push(entry);
    this.#update();
  }

  findEntryOfId(id) {
    return this.getAll().find(matchId(id));
  }

  deleteEntryOfId(id) {
    const indexOfEntry = this.getAll().findIndex(matchId(id));
    this.#entries.splice(indexOfEntry, 1);
    this.#update();
  }

  findEntries(options) {
    const { userId } = options;
    const entries = this.getAll().filter(matchUserId(userId));
    return entries.map(entryToJSON);
  }
}

module.exports = EntryRepository;
