const Business = require('../models/business');
const Colour = require('../models/colours/colour');
const ColourLibrary = require('../models/colours/colour-library');
const User = require('../models/user');

async function loadParameters(req, res, next) {
	try {
		if(req.params.userId || req.body.userId) {
			const user = await loadUser(req)
			if(user) {
				req.user = user
			} else {
				res.status(404).send('User not found');
			}
		}

		if(req.params.colourId || req.body.colourId) {
			const colour = await loadColour(req)
			if(colour) {
				req.colour = colour
			} else {
				res.status(404).send('Colour not found');
			}
		}

		if(req.params.businessId || req.body.businessId) {
			const business = await loadBusiness(req)
			if(business) {
				req.business = business
			} else {
				res.status(404).send('Business not found');
			}
		}

		if(req.params.colourLibraryId || req.body.colourLibraryId) {
			const colourLibrary = await loadColourLibrary(req)
			if(colourLibrary) {
				req.colourLibrary = colourLibrary
			} else {
				res.status(404).send('Colour library not found');
			}
		}
	} catch (error) {
		console.log(error)
		return res.sendStatus(500)
	}
	next()
};

async function loadUser(req) {
	const userId = req.params.userId || req.body.userId;

	try {
		const user = await User.findById(userId);
		return user;
	} catch (err) {
		console.log(err)
	}
};

async function loadBusiness(req) {
	const businessId = req.params.businessId || req.body.businessId;

	try {
		const business = await Business.findById(businessId);
		return business;
	} catch (err) {
		console.log(error)
	}
};

async function loadColour(req) {
	const colourId = req.params.colourId || req.body.colourId;

	try {
		const colour = await Colour.findById(colourId)
		return colour;
	} catch (err) {
		console.log(err)
	}
};

async function loadColourLibrary(req) {
	const colourLibraryId = req.params.colourLibraryId || req.body.colourLibraryId;

	try {
		const colourLibrary = await ColourLibrary.findById(colourLibraryId);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	loadParameters
}
