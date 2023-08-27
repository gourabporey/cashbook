class CashbookView {
  #summary;
  #entriesLog;
  #transactionTypeInput;
  #transactionInputForm;

  #sendDataOnFormSubmit;

  constructor({ summary, transTypeInput, entriesLog }) {
    this.#summary = summary;
    this.#entriesLog = entriesLog;
    this.#transactionTypeInput = transTypeInput;
  }

  onFormSubmit(sendData) {
    this.#sendDataOnFormSubmit = sendData;
  }

  #hideEntryInput() {
    this.#transactionTypeInput.classList.add('hidden');
  }

  #showEntryInput() {
    this.#transactionTypeInput.classList.remove('hidden');
  }

  #hideForm(form) {
    this.#transactionInputForm.removeChild(form);
    this.#transactionInputForm.classList.add('hidden');
  }

  #setupFormSubmitListener(form, type) {
    form.onsubmit = (event) => {
      event.preventDefault();

      const amountInputBox = getAmountInputBox();
      const amount = +amountInputBox.value;
      const title = getTitleInputBox().value;

      if (!amount) return alert('invalid amount');

      const entryData = {
        type,
        title,
        amount,
        timeStamp: Date.now(),
      };

      document.cookie = document.cookie || `userId=${Date.now()}`;

      this.#sendDataOnFormSubmit(entryData);

      this.#showEntryInput();
      this.#hideForm(form);
    };
  }

  openForm(type) {
    const form = generateElement(formTemplate);

    this.#transactionInputForm = transInputForm();
    this.#setupFormSubmitListener(form, type);
    this.#transactionInputForm.append(form);
    this.#transactionInputForm.classList.remove('hidden');

    this.#hideEntryInput();
  }

  setupListeners() {
    this.#transactionTypeInput.onclick = (event) => {
      this.openForm(event.target.id);
    };
  }

  updateSummary(summary) {
    Object.entries(summary).forEach(([field, value]) => {
      const summaryField = this.#summary[field];
      if (summaryField) summaryField.innerText = value;
    });
  }

  appendEntry({ type, amount, timeStamp, title }) {
    const classes = ['entry'].concat(type).join(' ');
    const [day, month, date, , time] = new Date(timeStamp)
      .toString()
      .split(' ');

    const formattedTime = [day, month, date, time].join(' ');
    const elements = [formattedTime, title, amount].map((text) => [
      'div',
      {},
      text,
    ]);
    const entryHtml = generateElement(['div', { class: classes }, elements]);

    this.#entriesLog.append(entryHtml);
  }
}
