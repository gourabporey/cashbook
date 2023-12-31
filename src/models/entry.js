class Entry {
  #id;
  #type;
  #title;
  #amount;
  #userId;
  #category;
  #timeStamp;

  constructor({ id, userId, title, timeStamp, type, amount, category }) {
    this.#id = id;
    this.#type = type;
    this.#title = title;
    this.#userId = userId;
    this.#amount = amount;
    this.#category = category;
    this.#timeStamp = timeStamp;
  }

  getId() {
    return this.#id;
  }

  getUserId() {
    return this.#userId;
  }

  modify(data) {
    const lookUp = {
      type: (type) => (this.#type = type),
      title: (title) => (this.#title = title),
      timeStamp: (timeStamp) => (this.#timeStamp = timeStamp),
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
      timeStamp: this.#timeStamp,
    };
  }
}

module.exports = Entry;
