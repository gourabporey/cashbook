const Entry = require('../models/entry');

const serveEntries = (req, res) => {
  res.json(req.app.entryRepository.serializeEntries());
};

const createEntry = (req, res) => {
  const entryData = req.body;
  entryData.userId = +req.cookies.userId;
  entryData.id = req.app.idGenerator.next().value;

  const entry = new Entry(entryData);
  req.app.entryRepository.addEntry(entry);

  res.status(201).json(entry.toJSON());
};

const parseData = (rawData) => {
  return Object.fromEntries(Object.entries(rawData).filter(([, val]) => val));
};

const editEntry = (req, res) => {
  const newData = parseData(req.body);
  const id = +req.params.id;
  req.app.entryRepository.modifyEntry(id, newData, () => {
    res.status(302).location('/').end();
  });
};

const serveEditPage = (req, res) => {
  const form = `
    <form action='/entries/${req.params.id}' method='POST'>
      <label for='amount'>Amount</label>
      <input type='number' name='amount' id='amount'></input>

      <label for='title'>Title</label>
      <input type='text' name='title' id='title'></input>

      <input type='submit' value='submit'></input>
    </form>
  `;

  res.send(form);
};

module.exports = { serveEntries, createEntry, editEntry, serveEditPage };
