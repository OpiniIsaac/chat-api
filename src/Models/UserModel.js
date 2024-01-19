const mongoose = require('mongoose');
// TODO:add password field
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  
  },
  email: {
    type: String,
  
    unique: true,
  },
  role: {
    type: String,
    enum: ['employee', 'hr'],
  
  },
  department: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
