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

module.exports = { serveSignupPage, validateCredentials };
