const Business = require('../models/business');
const Colour = require('../models/colours/colour');
const ColourLibrary = require('../models/colours/colour-library');
const User = require('../models/user');

async function loadParameters(req, res, next) {

	try {
		if(req.params.userId || req.body.userId) {
			req.user = await loadUser
		}

		if(req.params.colourId || req.body.colourId) {
			req.colour = await loadColour
		}

		if(req.params.businessId || req.body.businessId) {
			req.business = await loadBusiness
		}

		if(req.params.colourLibraryId || req.body.colourLibraryId) {
			req.colourLibrary = await loadColourLibrary
		}

	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}

	next()
};

function loadUser() {
	const userId = req.params.userId || req.body.userId;

	User.findById(usreId)
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

function loadBusiness() {
	const businessId = req.params.businessId || req.body.businessId;

	Business.findById(businessId)
	.then(business => {
		if(business == null) {
			throw new Error('Colour not found');
		} else {
			return business;
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

function loadColourLibrary() {
	const colourLibrary = req.params.colourLibraryId || req.body.colourLibraryId;

	ColourLibrary.findById(colourLibrary)
	.then(colourLibrary => {
		if(colourLibrary == null) {
			throw new Error('Colour Library not found');
		} else {
			return colourLibrary;
		}
	})
	.catch(error => {
		throw new Error(error)
	});
};

module.exports = {
	loadParameters
}
