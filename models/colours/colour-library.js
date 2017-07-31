const mongoose = require('mongoose');
const ColourSchema = require('mongoose').model('Colour').schema

// module Schema
const ColourLibrarySchema = mongoose.Schema({
  createdOn: Date,
  createdBy: String,
  colours: [ColourSchema],
  name: String,
  description: String,
});

module.exports = mongoose.model('ColourLibrary', ColourLibrarySchema);
