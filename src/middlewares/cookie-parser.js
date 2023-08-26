const parseCookies = (cookies = '') =>
  Object.fromEntries(
    cookies.split('; ').map((cookieValue) => cookieValue.split('='))
  );

const cookieParser = (req, _, next) => {
  req.cookies = parseCookies(req.headers.cookie);
  next();
};

module.exports = { cookieParser };
