const jwt = require('jsonwebtoken');

// ⚠️ Use your own secure secret here (NOT your reCAPTCHA secret!)
const JWT_SECRET = 'mySuperSecretKey123';

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT Error:', err.name, err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
