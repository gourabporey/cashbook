const formTemplate = [
  'form',
  { class: 'transaction-form', action: '/entries' },
  [
    [
      'input',
      {
        type: 'text',
        name: 'amount',
        required: true,
        id: 'amount-input-box',
      },
    ],
    [
      'input',
      {
        type: 'text',
        name: 'title',
        required: true,
        id: 'title-input-box',
        placeholder: 'Enter title',
      },
    ],
    ['input', { type: 'submit', value: 'submit' }],
    [
      'input',
      {
        type: 'button',
        value: 'cancel',
        id: 'cancel',
      },
    ],
  ],
];
