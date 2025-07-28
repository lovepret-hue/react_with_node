const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();



// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // Optional: if using cookies or auth headers
}));
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to JWT Auth API');
});
 // ✅ Parse incoming JSON



// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydb'); // ✅ Cleaned
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB');
});

// Import the User model
const User = require('./models/User');

// POST route to add user
app.post('/users', async (req, res) => {
  console.log(req.body); // for debugging
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET route to fetch users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Start the server
app.listen(3001, () => {
  console.log('🚀 Server running on http://localhost:3001');
});
