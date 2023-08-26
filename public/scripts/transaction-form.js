const transInputContainer = () =>
  document.querySelector('#transaction-input-container');

const hideEntryInput = () => {
  const inputBtnContainer = transInputContainer();
  inputBtnContainer.style.display = 'none';
};

const openForm = () => {
  const form = generateElement([
    'form',
    { class: 'transaction-form' },
    [
      [
        'input',
        { type: 'text', placeholder: 'Enter your amount', name: 'amount' },
      ],
      ['input', { type: 'submit', value: 'submit' }],
    ],
  ]);

  const amountEntrySection = document.querySelector('#transaction-input-form');
  amountEntrySection.append(form);

  hideEntryInput();
};
