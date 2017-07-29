const Config = require('../../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Auth = require('../../helpers/auth')

module.exports.deleteUser = async function(req, res) {
	const authorized = Auth.checkToken(req.get('Authorization'));
	if(!authorized.success) return res.status(401).json(authorized.message);

	try {
		const user = await User.findById(req.params.userId).remove();
		res.sendStatus(200);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports.getUser = function(req, res) {
	const authorized = Auth.checkToken(req.get('Authorization'));
	if(!authorized.success) {
		return res.status(401).json(authorized.message)
	}

	const decodedJwt = jwt.verify(req.get('Token'), Config.jwtSecret);
	const userId = decodedJwt.data._id;

	// check to ensure user is only able to access their own user profile, even if other id is entered as query param
	if(userId != req.params.userId) {
		return res.status(403).send('Unauthorized access, access denied');
	}

	return res.json(req.user);
};

module.exports.createUser = async function(req, res) {
	const authorized = await Auth.checkToken(req.get('Authorization'));
	if (!authorized.success) return res.status(401).json(authorized.message);

	const userExistsCheck = await User.findOne({email: req.body.email})
	if(userExistsCheck != null) {
		return res.status(500).send('Email address already in use');
	}

	try {
		const user = await new User({
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: bcrypt.hashSync(req.body.password, 8),
		}).save()

		const token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365),
			data: {_id: user._id, role: user.role}
		}, Config.jwtSecret);

		return res.status(200).json({token, last_authenticated: new Date().getTime()});
	} catch (error) {
		res.status(500).send(error)
	}
}

module.exports.authenticate = async function(req, res) {
	const authorized = await Auth.checkToken(req.get('Authorization'))
	if(!authorized.success) return res.status(401).json(authorized.message);

	const user = await User.findOne({email: req.body.email})

	if (authorized.accessedRoute == 'admin' && user.role != 'admin') {
		return res.status(401).send('Unauthorized access, access denied')
	}

	if (user == null) {
		return res.status(401).send('Incorrect email address or password');
	}

	const bcyptCompare = await bcrypt.compare(req.body.password, user.password)
	if(bcyptCompare) {
		const token = jwt.sign({
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
};

module.exports.updateUser = async function(req, res) {
	const authorized = Auth.checkToken(req.get('Authorization'));
	if(!authorized.success) return res.status(401).json(authorized.message);

	const decodedJwt = jwt.verify(req.get('Token'), Config.jwtSecret);
	const userId = decodedJwt.data._id;
	if(req.body.type == 'profile') {
		const user = await User.update({_id: userId}, req.body.updates)
		if (user.nModified >= 1) {
			return res.sendStatus(200);
		} else {
			return res.status(500).send('User update failed');
		}
	};

	if (req.body.type == 'password') {
		const bcyptCompare = await bcrypt.compare(req.body.password, req.user.password)
		if (!bcyptCompare) {
			return res.status(403).send('Current password does not match stored password');
		}
		req.user.password = bcrypt.hashSync(req.body.newPassword, 8);
		console.log(req.user)
		req.user.markModified('password')
		req.user.save();
		res.sendStatus(200);
	};
};
