const transInputForm = () => document.querySelector('#transaction-input-form');
const getAmountInputBox = () => document.querySelector('#amount-input-box');
const getTitleInputBox = () => document.querySelector('#title-input-box');
const getEntriesContainer = () => document.getElementById('entries-log');
const getProfileNameContainer = () => document.getElementById('profile-name');

const transInputContainer = () =>
  document.querySelector('#transaction-input-container');

const getSummaryContainers = () => {
  return {
    income: document.getElementById('income'),
    expense: document.getElementById('expense'),
    balance: document.getElementById('balance'),
  };
};

const parseCookies = (cookies = '') =>
  Object.fromEntries(
    cookies.split('; ').map((cookieValue) => cookieValue.split('='))
  );

const showUsername = () => {
  const { username } = parseCookies(document.cookie);
  const profileNameContainer = getProfileNameContainer();
  profileNameContainer.innerText = `Welcome ${username}`;
};

const main = () => {
  showUsername();

  const cashbook = new Cashbook();
  const apiService = { sendEntry, getAllEntries, deleteEntryOfId };

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
