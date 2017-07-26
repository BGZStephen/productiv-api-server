const mongoose = require('mongoose');

// module Schema
const ModuleSchema = mongoose.Schema({
  createdOn: Date,
  moduleName: String,
  apiEndpoints: [String],
});

module.exports = mongoose.model('Module', ModuleSchema);
