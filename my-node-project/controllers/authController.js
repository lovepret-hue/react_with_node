// controllers/authController.js
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    

    res.status(201).json({
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password, captcha } = req.body;

    // ✅ Check CAPTCHA
    if (!captcha) {
      return res.status(400).json({ message: 'CAPTCHA is required' });
    }

    const secretKey = '6LcoyIwrAAAAAGCOHx48y4G2T9l4ZXQlqMA-DhnW';

    const captchaResponse = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({
        secret: secretKey,
        response: captcha
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const { success } = captchaResponse.data;
    if (!success) {
      return res.status(400).json({ message: 'CAPTCHA verification failed' });
    }

    // ✅ Validate email/password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // ✅ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ✅ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ✅ Generate JWT (same secret as in middleware)
    const JWT_SECRET = 'mySuperSecretKey123'; // 👈 use same key in middleware
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error at node' });
  }
};

exports.getDashboard = (req, res) => {
  res.json({ message: `Welcome ${req.user.username} to the dashboard!` });
};
exports.ProfileUpdate = (req, res) => {
  res.json({ message: `Welcome ${req.user.username} to the dashboard!` });
};
exports.getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found'+req.user.id});
    }

    res.json(user);
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.UpdateProfile = async (req, res) => {
  try {
    const { fullName, gender } = req.body;

    const updateData = {
      fullName,
      gender,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`; // ✅ includes extension
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
