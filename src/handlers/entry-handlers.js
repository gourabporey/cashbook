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

const editEntry = (req, res) => {
  const newData = req.body;
  const id = +req.params.id;
  const updatedEntry = req.app.entryRepository.modifyEntry(id, newData);
  res.status(200).json(updatedEntry);
};

module.exports = { serveEntries, createEntry, editEntry };
