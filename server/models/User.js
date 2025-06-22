const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ['guest', 'master'], default: 'guest' }
});

module.exports = mongoose.model('User', UserSchema);
