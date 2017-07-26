const mongoose = require('mongoose');

// module Schema
const ColorSchema = mongoose.Schema({
  createdOn: Date,
  createdBy: String,
  hex: String,
  red: Number,
  green: Number,
  blue: Number,
});

module.exports = mongoose.model('Color', ColorSchema);
