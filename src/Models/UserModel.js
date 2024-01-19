const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['employee', 'hr'],
    required: true,
  },
  department: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
