class CashbookView {
  #summary;
  #entriesLog;
  #transactionTypeInput;
  #transactionInputForm;

  #sendDataOnFormSubmit;
  #sendIdOfEntry;

  constructor({ summary, transTypeInput, entriesLog }) {
    this.#summary = summary;
    this.#entriesLog = entriesLog;
    this.#transactionTypeInput = transTypeInput;
  }

  onFormSubmit(sendData) {
    this.#sendDataOnFormSubmit = sendData;
  }

  onDeleteBtnClick(sendId) {
    this.#sendIdOfEntry = sendId;
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
    form
      .querySelector('#amount-input-box')
      .setAttribute('placeholder', `Enter your ${type}`);

    form.querySelector('#cancel').onclick = () => document.location.reload();

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

  appendEntry({ type, amount, timeStamp, title, id }) {
    const [day, month, date, , time] = new Date(timeStamp)
      .toString()
      .split(' ');

    const formattedTime = [day, month, date, time].join(' ');

    const elements = [
      [formattedTime, 'time'],
      [title, `title ${type}`],
      [amount, `amount ${type}`],
    ].map(([value, elemName]) => ['div', { class: elemName }, value]);

    const editBtn = generateElement([
      'a',
      { class: 'edit', href: `/entries/${id}/edit` },
      'edit',
    ]);

    const deleteBtn = generateElement([
      'input',
      { type: 'button', value: 'delete', class: 'delete' },
      '',
    ]);

    deleteBtn.onclick = () => this.#sendIdOfEntry(id);

    const entryHtml = generateElement(['div', { class: 'entry' }, elements]);
    entryHtml.append(editBtn, deleteBtn);

    this.#entriesLog.append(entryHtml);
  }

  clear() {
    this.#entriesLog.innerHTML = '';
  }
}
