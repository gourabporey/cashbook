const serveSignupPage = (_, res) => {
  res.sendFile(process.env.PWD + '/src/templates/signup.html');
};

module.exports = serveSignupPage;
