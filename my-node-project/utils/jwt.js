// utils/jwt.js
const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
   const secret = '6LcoyIwrAAAAAGCOHx48y4G2T9l4ZXQlqMA-DhnW';
  if (!secret) throw new Error('JWT secret key is missing');
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};
