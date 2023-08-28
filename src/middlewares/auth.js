const serveSignupPage = (_, res) => {
  res.sendFile('/signup.html', { root: 'src/templates' });
};

const validateCredentials = (req, res, next) => {
  const { email, name, password } = req.body;
  const EMAIL_REGEX = /^[\w\.]+@[\w\.]+\.[\w]+$/;
  const NAME_REGEX = /\w+/;
  const PASSWORD_REGEX = /\w+/;

  const shouldProceed = [
    [EMAIL_REGEX, email],
    [NAME_REGEX, name],
    [PASSWORD_REGEX, password],
  ].every(([regex, text]) => regex.test(text));

  if (shouldProceed) next();
  else res.status(400).end();
};

module.exports = { serveSignupPage, validateCredentials };
