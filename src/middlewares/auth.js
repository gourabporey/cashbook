const serveSignupPage = (_, res) => {
  res.sendFile('/signup.html', { root: 'src/templates' });
};

const validateCredentials = (req, res, next) => {
  const { username, password } = req.body;
  const NAME_REGEX = /\w+/;
  const PASSWORD_REGEX = /\w+/;

  const shouldProceed = [
    [NAME_REGEX, username],
    [PASSWORD_REGEX, password],
  ].every(([regex, text]) => text && regex.test(text));

  if (shouldProceed) next();
  else res.status(400).end();
};

const authenticator = (req, res, next) => {
  const { username, authToken } = req.cookies;
  const isValidToken = req.app.userRepository.validateTokens({
    username,
    hashPassword: authToken,
  });

  if (!isValidToken) return res.status(302).location('/signup').end();

  next();
};

const authenticateUser = (req, res, next) => {
  const credentials = req.body;
  const { validUsername, validPassword } =
    req.app.userRepository.validateCredentials(credentials);

  if (!validUsername || !validPassword) return res.status(401).end();

  next();
};

module.exports = {
  serveSignupPage,
  validateCredentials,
  authenticator,
  authenticateUser,
};
