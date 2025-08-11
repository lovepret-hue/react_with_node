// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getDashboard,ProfileUpdate,getProfile,UpdateProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');


const upload = require('../middleware/upload');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/dashboard', auth, getDashboard);
router.get('/profile-update', auth, ProfileUpdate);
router.get('/profile', auth, getProfile);
router.put('/profile-update', auth, upload.single('image'), UpdateProfile);


module.exports = router;
