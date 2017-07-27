const User = require('../models/user')

async function loadParameters(req, res, next) {

	try {
		if(req.params.userId || req.body.userId) {
			req.user = await loadUser
		}

		if(req.params.colourId || req.body.colourId) {
			req.colour = await loadColour
		}
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
};

function loadUser() {
	const userId = req.params.userId || req.body.userId;

	Colour.findById(usreId)
	.then(user => {
		if(user == null) {
			throw new Error('User not found');
		} else {
			return user;
		}
	})
	.catch(error => {
		throw new Error(error)
	});
};

function loadColour() {
	const colourId = req.params.colourId || req.body.colourId;

	Colour.findById(colourId)
	.then(colour => {
		if(colour == null) {
			throw new Error('Colour not found');
		} else {
			return colour;
		}
	})
	.catch(error => {
		throw new Error(error)
	});
};

module.exports = {
	loadParameters
}
