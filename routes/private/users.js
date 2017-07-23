const Config = require('../../config');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Auth = require('../../helpers/auth');

module.exports.getAll = function(req, res) {
	const processGetAll = async function() {
		const authorized = Auth.checkToken(req.get('Authorization'));
		if(!authorized) return res.status(401).json({error: 'Unauthorized access, access denied'});

		const decodedJwt = jwt.verify(req.get('Token'), Config.jwtSecret);
		const role = decodedJwt.data.role;

		if(role != 'admin') return res.status(401).json({error: 'Unauthorized access, access denied'});

		const users = await User.find({})
		if(users.length == 0) {
			res.status(500).send("No users found")
		} else {
			res.json(users)
		}
	}

	processGetAll()
	.catch(error => res.status(500).send(error));
};
