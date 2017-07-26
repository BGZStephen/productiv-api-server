const mongoose = require('mongoose');
const ColorSchema = require('./color')

// palette Schema
const PaletteSchema = mongoose.Schema({
  createdOn: Date,
  createdBy: String,
  hex: String,
  colors: [{
    description: String,
    color: ColorSchema
  }]
});

module.exports = mongoose.model('Palette', PaletteSchema);
