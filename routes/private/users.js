const Config = require('../../config');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Auth = require('../../helpers/auth');

module.exports.getAll = function(req, res) {
	const authorized = Auth.routeAuth(req.get('Authorization'));
	if(!authorized) {
		return res.status(401).json({error: 'Unauthorized access, access denied'});
	}

	const decodedJwt = jwt.verify(req.get('Token'), Config.jwtSecret);
	const role = decodedJwt.data.role;

	if(role != 'admin') {
		return res.status(401).json({error: 'Unauthorized access, access denied'});
	}

	User.getAll()
	.then(users => {
		res.json(users);
	})
	.catch(error => {
		res.status(500).send(error);
	});
};
