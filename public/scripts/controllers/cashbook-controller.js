class CashbookController {
  #view;
  #cashbook;
  #apiService;

  constructor(cashbook, view, apiService) {
    this.#view = view;
    this.#cashbook = cashbook;
    this.#apiService = apiService;
  }

  #addAndRender(entry) {
    const summary = this.#cashbook.addEntry(entry).getSummary();
    this.#view.updateSummary(summary);
    this.#view.appendEntry(entry);
  }

  #getAndRenderEntries() {
    this.#apiService.getAllEntries((entries) => {
      entries.forEach((entry) => {
        this.#addAndRender(entry);
      });
    });
  }

  start() {
    this.#view.onFormSubmit((entry) => {
      this.#apiService.sendEntry(entry, (entry) => this.#addAndRender(entry));
    });

    this.#view.setupListeners();
    this.#getAndRenderEntries();
  }
}
