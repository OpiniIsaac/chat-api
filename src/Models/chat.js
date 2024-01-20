const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;