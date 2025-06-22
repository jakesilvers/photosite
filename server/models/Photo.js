const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  imageUrl: String,
  title: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Photo', PhotoSchema);
