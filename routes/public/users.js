const Config = require('../../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Auth = require('../../helpers/auth')

module.exports.loadUser = function(req, res, next) {
	const userId = req.params.userId || req.body.id;

	User.findById(userId)
	.then(user => {
		if(user == null) {
			return res.status(500).send('User not found')
		} else {
			req.user = user;
			next();
		}
	})
	.catch(error => res.status(500).semd(error));
};

module.exports.deleteUser = function(req, res) {
	const authorized = Auth.checkToken(req.get('Authorization'));
	if(!authorized.success) return res.status(401).json(authorized.message);

	User.delete(req.params.userId)
	.then(res.sendStatus(200))
	.catch(error => res.status(500).send(error));
};

module.exports.getUser = function(req, res) {
	const authorized = Auth.checkToken(req.get('Authorization'));
	if(!authorized.success) return res.status(401).json(authorized.message)

	let decodedJwt = jwt.verify(req.get('Token'), Config.jwtSecret);
	let userId = decodedJwt.data._id;

	// check to ensure user is only able to access their own user profile, even if other id is entered as query param
	if(userId != req.params.userId) return res.status(403).send('Unauthorized access, access denied');

	return res.json(req.user);
};

module.exports.createUser = function(req, res) {
	const processCreateUser = async function() {
		const authorized = await Auth.checkToken(req.get('Authorization'));
		if (!authorized.success) return res.status(401).json(authorized.message);

		const userExistsCheck = await User.findOne({email: req.body.email})
		if(userExistsCheck != null) return res.status(500).send('Email address already in use');

		const user = await new User(req.body.user).save()

		let token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365),
			data: {_id: user._id, role: user.role}
		}, Config.jwtSecret);

		return res.status(200).json({token, last_authenticated: new Date().getTime()});
	}

	processCreateUser()
	.catch(error => res.status(500).send(error));
}

module.exports.authenticate = function(req, res) {
	const processAuthenticate = async function() {
		const authorized = await Auth.checkToken(req.get('Authorization'))
		if(!authorized.success) return res.status(401).json(authorized.message);

		const user = await User.findOne({email: req.body.email})
		if (authorized.accessedRoute == 'admin' && user.role != 'admin') return res.status(401).send('Unauthorized access, access denied')
		if (user == null) return res.status(401).send('Incorrect email address or password');

		const bcyptCompare = bcrypt.compare(req.body.password, user.password)
		if(bcyptCompare) {
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
	}

	processAuthenticate()
	.catch(error => res.status(500).send(error));
};

module.exports.updateUser = function(req, res) {
	const processUpdateUser = async function() {
		const authorized = Auth.checkToken(req.get('Authorization'));
		if(!authorized.success) return res.status(401).json(authorized.message);

		let decodedJwt = jwt.verify(req.get('Token'), Config.jwtSecret);
		let userId = decodedJwt.data._id;

		if(req.body.type == 'profile') {
			const user = await User.update(userId, req.body.updates)
			if(user.nModified >= 1) return res.sendStatus(200);
			else return res.status(500).send('User update failed');
		};

		if (req.body.type == 'password') {
			req.user.password = bcrypt.hashSync(req.body.password, 8);
			req.user.markModified('password').save(res.sendStatus(200));
		};
	}

	processUpdateUser()
	.catch(error => res.status(500).send(error));
};
