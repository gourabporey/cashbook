const parseCookies = (cookies) =>
  Object.fromEntries(cookies.split('; ').map((kv) => kv.split('=')));

const cookieParser = (req, _, next) => {
  req.cookies = parseCookies(req.headers.cookie);
  next();
};

module.exports = { cookieParser };
