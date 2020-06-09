const SALT = 12;
const COOKIE_OPTION = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

module.exports = {
  SALT,
  COOKIE_OPTION,
};
