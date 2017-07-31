const Config = require('../../config');
const bcrypt = require('bcryptjs');
const winston = require('winston')
const jwt = require('jsonwebtoken');
const Mailer = require('../../services/mailer/nodemailer');
const User = require('../../models/user');

async function create(req, res) {
	const userExistsCheck = await User.findOne({email: req.body.email})
	if(userExistsCheck != null) {
		winston.log('debug', 'User already exists');
		return res.status(500).send('Email address already in use');
	}

	try {
		const user = await new User({
			email: req.body.email,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: bcrypt.hashSync(req.body.password, 8),
			role: 'user',
		}).save()

		const token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365),
			data: {_id: user._id, role: user.role}
		}, Config.jwtSecret);

		res.status(200).json({token, last_authenticated: new Date().getTime()});
	} catch (error) {
		winston.log('debug', error);
		res.sendStatus(500)
	}
}

async function authenticate(req, res) {
	const user = await User.findOne({email: req.body.email})

	if (user == null) {
		winston.log('debug', 'User not found');
		res.status(401).send('Incorrect email address or password');
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
		winston.log('debug', 'Incorrect password');
		res.status(401).send('Incorrect email address or password');
	}
};

module.exports = {
	create,
	authenticate
}
