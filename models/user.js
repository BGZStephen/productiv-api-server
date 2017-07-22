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

module.exports.create = function(userObject) {
	return new Promise((resolve, reject) => {
		User.findOne({email: userObject.email})
			.then(user => {
				if(user != null) {
					reject('Email address already in use');
				} else {
					// hash password before storing in database
					userObject.password = bcrypt.hashSync(userObject.password, 8);
					userObject.save().then(user => {
						if(user != null) {
							resolve(user);
						} else {
							reject('User creation failed');
						}
					});
				}
			});
	});
};

module.exports.delete = function(userId) {
	return new Promise((resolve, reject) => {
		User.findOne({_id: userId}).delete().then(user => {
			if(JSON.parse(user).n == 1) {
				resolve();
			} else {
				reject('User deletion failed');
			}
		});
	});
};

module.exports.getAll = function() {
	return new Promise((resolve, reject) => {
		User.find({}).then(users => {
			if(users.length != 0) {
				resolve(users);
			} else {
				reject('Unable to retrieve users');
			}
		});
	});
};

module.exports.getOne = function(userObject) {
	return new Promise((resolve, reject) => {
		User.findOne(userObject).then(user => {
			if(user != null) {
				resolve(user);
			} else {
				reject('Unable to retrieve user');
			}
		});
	});
};

module.exports.update = function(userId, update) {
	return new Promise((resolve, reject) => {
		User.update({_id: userId}, update).then(user => {
			if(user.nModified >= 1) {
				resolve();
			} else {
				reject('User update failed');
			}
		});
	});
};

module.exports.updatePassword = function(userObject) {
	return new Promise((resolve, reject) => {
		User.findOne({_id: userObject._id}).then(user => {
			user.password = bcrypt.hashSync(userObject.password, 8);
			user.markModified('password');
			user.save(resolve, reject);
		});
	});
};
