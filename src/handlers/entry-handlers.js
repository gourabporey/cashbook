const serveEntries = (req, res) => {
  res.json(req.app.entryRepository.serializeEntries());
};

module.exports = { serveEntries };
