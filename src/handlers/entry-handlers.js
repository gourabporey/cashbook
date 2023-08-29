const fs = require('fs');
const Entry = require('../models/entry');

const serveEntries = (req, res) => {
  res.json(
    req.app.entryRepository.findEntries({ userId: req.cookies.authToken })
  );
};

const createEntry = (req, res) => {
  const entryData = req.body;
  entryData.userId = req.cookies.authToken;
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
  newData.amount = +newData.amount;
  const id = +req.params.id;
  req.app.entryRepository.modifyEntry(id, newData, () => {
    res.status(302).location('/').end();
  });
};

const serveEditPage = (req, res) => {
  fs.readFile('./src/templates/change-entry.html', 'utf8', (err, data) => {
    const form = data.replace('$action', `/entries/${req.params.id}`);
    const profileAdded = form.replace('$username', req.cookies.username);
    res.send(profileAdded);
  });
};

const deleteEntry = (req, res) => {
  const id = +req.params.id;
  req.app.entryRepository.deleteEntryOfId(id, () => {
    res.status(204).end();
  });
};

module.exports = {
  serveEntries,
  createEntry,
  editEntry,
  serveEditPage,
  deleteEntry,
};
