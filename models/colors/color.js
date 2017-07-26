const mongoose = require('mongoose');

// module Schema
const ColorSchema = mongoose.Schema({
  createdOn: Date,
  createdBy: String,
  hex: String,
  rgb: {
    r: Number,
    g: Number,
    b: Number,
  },
});

module.exports = mongoose.model('Color', ColorSchema);
