const Config = require('../../config');
const jwt = require('jsonwebtoken');
const ColourLibrary = require('./colour-library');
const Mailer = require('../../services/mailer/nodemailer');
const User = require('../../models/user');

async function getAll(req, res) {
	const decodedJwt = jwt.verify(req.get('Token'), Config.jwtSecret);
	const role = decodedJwt.data.role;

	if(role != 'admin') {
		winston.log('debug', 'User not admin');
		return res.status(401).json({error: 'Unauthorized access, access denied'});
	}

	try {
		const users = await User.find({})
		if(users.length == 0) {
			winston.log('debug', 'No users found');
			res.status(500).send("No users found")
		} else {
			res.json(users)
		}
	} catch (error) {
		res.status(500).send(error);
	}
}

async function deleteOne(req, res) {
	try {
		const user = await User.findById(req.params.userId).remove();
		res.sendStatus(200);
	} catch (error) {
		winston.log('debug', error);
		res.status(500).send(error);
	}
};

function getOne(req, res) {
	const decodedJwt = jwt.verify(req.get('Token'), Config.jwtSecret);
	const userId = decodedJwt.data._id;

	// check to ensure user is only able to access their own user profile, even if other id is entered as query param
	if(userId != req.params.userId) {
		winston.log('debug', 'User trying to access a route not their own');
		return res.status(403).send('Unauthorized access, access denied');
	}

	return res.json(req.user);
};

async function updateOne(req, res) {
	const decodedJwt = jwt.verify(req.get('Token'), Config.jwtSecret);
	const userId = decodedJwt.data._id;
	if(req.body.type == 'profile') {
		const user = await User.update({_id: userId}, req.body.updates)
		if (user.nModified >= 1) {
			return res.sendStatus(200);
		} else {
			winston.log('debug', 'User update failed');
			return res.status(500).send('User update failed');
		}
	};

	if (req.body.type == 'password') {
		const bcyptCompare = await bcrypt.compare(req.body.password, req.user.password)
		if (!bcyptCompare) {
			winston.log('debug', 'Bcrypt comparison failed');
			return res.status(403).send('Current password does not match stored password');
		}
		req.user.password = bcrypt.hashSync(req.body.newPassword, 8);
		req.user.markModified('password')
		req.user.save();
		res.sendStatus(200);
	};
};

module.exports = {
	getAll,
	deleteOne,
	getOne,
	updateOne
}
