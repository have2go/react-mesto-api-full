require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/401-unauth');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new UnauthorizedError('Вы не авторизованы');
  }

  req.user = payload;
  next();
};
