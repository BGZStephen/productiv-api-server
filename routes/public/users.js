const Config = require('../../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
const User = require('../../models/user');
const Auth = require('../../helpers/auth')

module.exports.loadUser = function(req, res, next) {
	const userId = req.params.userId || req.body.id

	User.findById(userId)
	.then(user => {
		if(user == null) {
			return res.status(500).send('User not found')
		} else {
			req.user = user
			next()
		}
	})
};

module.exports.deleteUser = function(req, res) {
	const authorized = Auth.checkToken(req.get('Authorization'));
	if(!authorized.success) {
		return res.status(401).json(authorized.message);
	}

	User.delete(req.params.userId)
	.then(() => {
		res.sendStatus(200);
	})
	.catch(error => {
		res.status(500).send(error);
	});
};

module.exports.getUser = function(req, res) {
	const authorized = Auth.checkToken(req.get('Authorization'));
	if(!authorized.success) {
		return res.status(401).json(authorized.message);
	}

	let token = req.get('Token');
	let decoded = jwt.verify(token, Config.jwtSecret);
	let userId = decoded.data._id;

	// check to ensure user is only able to access their own user profile, even if other id is entered as query param
	if(userId != req.params.userId) {
		return res.status(403).send('Unauthorized access, access denied');
	}

	return res.json(req.user);
};

module.exports.createUser = function(req, res) {
	const authorized = Auth.checkToken(req.get('Authorization'));
	if(!authorized.success) {
		return res.status(401).json(authorized.message);
	}

	let userObject = new User({
		email: req.body.email,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password
	});

	User.find({email: req.body.email})
	.then(user => {
		if (user != null) {
			return res.status(500).send('Email address already in use');
		}
		return userObject.save(userObject)
	})
	.then(user => {
		let token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365),
			data: {_id: user._id}
		}, Config.jwtSecret);

		let response = {
			token,
			last_authenticated: new Date().getTime(),
		};

		res.status(200).json(response);
	})
	.catch(error => {
		res.status(500).send(error);
	});
};

module.exports.authenticate = function(req, res) {
	const authorized = Auth.checkToken(req.get('Authorization'));
	if(!authorized.success) {
		return res.status(401).json(authorized.message);
	}

	User.findOne({email: req.body.email})
	.then(user => {
		if(authorized.route == 'admin' && user.role != 'admin') {
			return res.status(401).send('Unauthorized access, access denied');
		}

		if(user == null) {
			return res.status(401).send('Incorrect email address or password');
		}

		bcrypt.compare(req.body.password, user.password)
		.then((authResult) => {
			if(authResult) {
				let token = jwt.sign({
					exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365),
					data: {_id: user._id, role: user.role}
				}, Config.jwtSecret);

				res.json({
					token,
					last_authenticated: new Date().getTime(),
				});
			} else {
				return res.status(401).send('Incorrect email address or password');
			}
		})
	})
	.catch(error => {
		res.status(500).send(error);
	});
};

module.exports.updateUser = function(req, res) {
	const authorized = Auth.checkToken(req.get('Authorization'));
	if(!authorized.success) {
		return res.status(401).json(authorized.message);
	}

	let token = req.get('Token');
	let decoded = jwt.verify(token, Config.jwtSecret);
	let userId = decoded.data._id;

	if(req.body.type == 'profile') {

		User.update(userId, req.body.updates)
    .then(user => {
			if(user.nModified >= 1) {
				res.sendStatus(200);
			} else {
				return res.status(500).send('User update failed');
			}
		})
    .catch(error => {
      res.status(500).send(error);
    });
	} else if (req.body.type == 'password') {
		req.user.password = bcrypt.hashSync(req.body.password, 8);
		req.user.markModified('password');
		req.user.save(res.sendStatus(200));
	}
};
