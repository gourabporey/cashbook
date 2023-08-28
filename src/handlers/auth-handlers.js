const signupUser = (req, res) => {
  const { username, password } = req.body;
  const { userRepository } = req.app;

  if (userRepository.existsUser(username)) return res.status(400).end();

  userRepository.addUser(username, password, (err, token) => {
    if (err) return res.status(500).end();
    res.cookie('username', username);
    res.cookie('authToken', token);
    console.log('hello');
    res.status(200).end();
  });
};

module.exports = { signupUser };
