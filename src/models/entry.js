class Entry {
  #id;
  #type;
  #title;
  #amount;
  #userId;
  #category;

  constructor({ id, userId, title, type, amount, category }) {
    this.#id = id;
    this.#type = type;
    this.#title = title;
    this.#userId = userId;
    this.#amount = amount;
    this.#category = category;
  }

  modify(data) {
    const lookUp = {
      id: (id) => (this.#id = id),
      type: (type) => (this.#type = type),
      title: (title) => (this.#title = title),
      category: (category) => (this.#category = category),
      amount: (amount) => (this.#amount = amount),
    };

    Object.entries(data).forEach(([key, val]) => {
      const modifier = lookUp[key];
      if (modifier) modifier(val);
    });

    return this;
  }

  toJSON() {
    return {
      id: this.#id,
      type: this.#type,
      title: this.#title,
      userId: this.#userId,
      amount: this.#amount,
      category: this.#category,
    };
  }

  static fromJSON(properties) {
    return new Entry(properties);
  }
}

module.exports = Entry;
