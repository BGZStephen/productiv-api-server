const mongoose = require('mongoose');

// business Schema
const BusinessSchema = mongoose.Schema({
  businessName: String,
  businessAddress: String,
  businessUsers: [{
    userId: String,
    burinssRole: String,
  }],
	created_on: Date,
  website: String,
});

module.exports = mongoose.model('Business', BusinessSchema);
