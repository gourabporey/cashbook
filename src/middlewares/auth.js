const serveSignupPage = (_, res) => {
  res.sendFile('/signup.html', { root: 'src/templates' });
};

const validateCredentials = (req, res, next) => {
  const { email, name, password } = req.body;
  const EMAIL_REGEX = /^[\w\.]+@[\w\.]+\.[\w]+$/;
  const NAME_REGEX = /\w+/;
  const PASSWORD_REGEX = /\w+/;

  if (
    EMAIL_REGEX.test(email) &&
    NAME_REGEX.test(name) &&
    PASSWORD_REGEX.test(password)
  )
    next();
  else res.status(400).end();
};

module.exports = { serveSignupPage, validateCredentials };
