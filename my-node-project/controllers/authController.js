// controllers/authController.js
const axios = require('axios');
const bcrypt = require('bcryptjs');

const { generateToken } = require('../utils/jwt');
const User = require('../models/User');

// In-memory user store (replace with DB in production)
const users = [];

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Validate fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // ✅ Save user
    await newUser.save();

    // ✅ Generate JWT
    const token = generateToken({ id: newUser._id, username: newUser.username });

    res.status(201).json({
      message: 'User registered successfully',
      token
    });

  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// =============================
// Login User
// =============================
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // ✅ Validate input
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     // ✅ Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // ✅ Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // ✅ Generate JWT
//     const token = generateToken({ id: user._id, username: user.username });

//     res.status(200).json({
//       message: 'Login successful',
//       token
//     });

//   } catch (error) {
//     console.error('Login Error:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
exports.loginUser = async (req, res) => {
  try {
    const { email, password, captcha } = req.body;

    // ✅ Check CAPTCHA
    if (!captcha) {
      return res.status(400).json({ message: 'CAPTCHA is required' });
    }

    const secretKey = '6LcoyIwrAAAAAGCOHx48y4G2T9l4ZXQlqMA-DhnW'; // Replace with your actual secret
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

    const captchaResponse = await axios.post(verifyURL);
    const { success } = captchaResponse.data;

    if (!success) {
      return res.status(400).json({ message: 'CAPTCHA verification failed' });
    }

    // ✅ Validate email/password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // ✅ Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ✅ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ✅ Generate JWT
    const token = generateToken({ id: user._id, username: user.username });

    res.status(200).json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDashboard = (req, res) => {
  res.json({ message: `Welcome ${req.user.username} to the dashboard!` });
};
