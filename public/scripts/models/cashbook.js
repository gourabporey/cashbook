class Cashbook {
  #entries;

  constructor(entries = []) {
    this.#entries = entries;
  }

  #findIndexOfEntry(id) {
    return this.#entries.findIndex((entry) => entry.id === id);
  }

  getSummary() {
    const summary = { income: 0, expense: 0, balance: 0 };

    this.#entries.forEach(({ type, amount }) => {
      summary[type] += amount;
      summary.balance = summary.income - summary.expense;
    });

    return summary;
  }

  addEntry(entry) {
    this.#entries.push(entry);
    return this;
  }

  replace(entry) {
    const id = entry.id;
    const indexOfEntry = this.#findIndexOfEntry(id);
    this.#entries[indexOfEntry] = entry;
    return this;
  }

  removeEntry(id) {
    const indexOfEntry = this.#findIndexOfEntry(id);
    this.#entries.splice(indexOfEntry, 1);
    return this;
  }

  getEntries() {
    return this.#entries;
  }

  clear() {
    this.#entries = [];
  }
}
