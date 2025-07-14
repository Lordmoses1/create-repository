const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskName: String,
  socialMedia: String,
  quantity: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  verificationCode: String,
  workers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Task', taskSchema);