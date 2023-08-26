const generateId = function* () {
  let id = 0;

  while (true) {
    yield id;
    id++;
  }
};

module.exports = { generateId };
