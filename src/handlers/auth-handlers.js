const signupUser = (req, res) => {
  const { username, password } = req.body;
  const { userRepository } = req.app;

  if (userRepository.existsUser(username))
    return res
      .status(400)
      .send(`<p>Account exits login instead. <a href='/login'>Login</a></p>`);

  userRepository.addUser(username, password, (err) => {
    if (err) return res.status(500).end();
    res.status(302).location('/login').end();
  });
};

const serveLoginPage = (req, res) => {
  res.sendFile('/login.html', { root: 'src/templates' });
};

const loginUser = (req, res) => {
  const { username } = req.body;
  const authToken = req.app.userRepository.getToken(username);

  res.cookie('username', username);
  res.cookie('authToken', authToken);

  res.status(302).location('/').end();
};

const logoutUser = (req, res) => {
  res.clearCookie('username');
  res.clearCookie('authToken');
  res.status(302).location('/').end();
};

module.exports = { signupUser, loginUser, serveLoginPage, logoutUser };
