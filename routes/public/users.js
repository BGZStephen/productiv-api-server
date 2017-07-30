const Config = require('../../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mailer = require('../../services/mailer/nodemailer');
const User = require('../../models/user');

module.exports.createUser = async function(req, res) {
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
