const mongoose = require('mongoose');

// business Schema
const BusinessSchema = mongoose.Schema({
  businessName: String,
  businessAddress: String,
  businessUsers: [{
    userId: String,
    burinssRole: String,
  }]
	created_on: Date,
  emailFormats: [String]
  website: String,
});

const Business = module.exports = mongoose.model('Business', BusinessSchema);
