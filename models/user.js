const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// user Schema
const UserSchema = mongoose.Schema({
	businesses: [{
		businessId: String,
		businessName: String,
	}],
	created_on: Date,
	email: {
		required: true,
		type: String,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	modules: [{
		moduleId: String,
		moduleName: String,
		moduleConfig: Object,
	}],
	password: String,
	role: String
});

const User = module.exports = mongoose.model('User', UserSchema);
