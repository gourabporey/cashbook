const generateId = () => ({
  next() {
    return { value: Date.now() };
  },
});

module.exports = { generateId };
