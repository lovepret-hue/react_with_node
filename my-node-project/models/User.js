const mongoose = require('mongoose');

// Define a schema (structure) for the user
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // Optional: restrict to certain values
    default: 'Other'
  },
  image: {
    type: String, // Usually stores the file path or URL
    default: ''   // Default can be empty or a default image URL
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Export the model so we can use it
module.exports = mongoose.model('User', userSchema);
