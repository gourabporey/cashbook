const transInputForm = () => document.querySelector('#transaction-input-form');
const getAmountInputBox = () => document.querySelector('#amount-input-box');
const getTitleInputBox = () => document.querySelector('#title-input-box');
const getEntriesContainer = () => document.getElementById('entries-log');

const transInputContainer = () =>
  document.querySelector('#transaction-input-container');

const getSummaryContainers = () => {
  return {
    income: document.getElementById('income'),
    expense: document.getElementById('expense'),
    balance: document.getElementById('balance'),
  };
};

const main = () => {
  const cashbook = new Cashbook();
  const apiService = { sendEntry, getAllEntries };

  const summary = getSummaryContainers();
  const entriesLog = getEntriesContainer();
  const transTypeInput = transInputContainer();
  const view = new CashbookView({
    summary,
    transTypeInput,
    entriesLog,
  });

  const cashbookController = new CashbookController(cashbook, view, apiService);
  cashbookController.start();
};

window.onload = main;
