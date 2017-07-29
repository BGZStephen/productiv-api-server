const mongoose = require('mongoose');
const ColourSchema = require('mongoose').model('Colour').schema

// palette Schema
const PaletteSchema = mongoose.Schema({
  createdOn: Date,
  createdBy: String,
  hex: String,
  colors: [{
    description: String,
    color: ColourSchema
  }]
});

module.exports = mongoose.model('Palette', PaletteSchema);
