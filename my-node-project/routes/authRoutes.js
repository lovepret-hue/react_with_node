// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getDashboard } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/dashboard', auth, getDashboard);

module.exports = router;
