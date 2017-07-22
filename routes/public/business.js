const Config = require('../../config');
const jwt = require('jsonwebtoken');
const Auth = require('../../helpers/auth');
const Business = require('../../models/business');
const User = require('../../models/user');

module.exports.loadBusiness = function(req, res, next) {
  const businessId = req.params.businessId || req.body.id;

	Business.findById(businessId)
	.then(business => {
    if(business == null) {
			return res.status(500).send('Business not found');
		} else {
			req.business = business;
			next();
		}
	})
  .catch(error => res.status(500).send(error));
};

module.exports.createBusiness = function(req, res) {
  const authorized = Auth.checkToken(req.get('Authorization'));
	if(!authorized.success) {
		return res.status(401).json(authorized.message);
	}

  let businessObject = new Business({
    businessName: req.body.businessName,
    businessAddress: req.body.businessAddress,
    createdOn: new Date(),
    website: req.body.website,
  });

  businessObject.save()
  .then(res.sendStatus(200))
  .catch(error => res.status(500).send(error));
};

module.exports.getBusiness = function(req, res) {
  const authorized = Auth.checkToken(req.get('Authorization'));
  if(!authorized.success) {
    return res.status(401).json(authorized.message);
  }

  let decodedJwt = jwt.verify(req.get('Token'), Config.jwtSecret);
  let userId = decodedJwt.data._id;

  User.findById(userId)
  .then(user => {
    // check for the presence of the business within the users businesses array
    const businessPresentInUser = user.businesses.filter(function(business) {
      if(business.businessId === req.business._id) {
        return business;
      }
    });

    if (businessPresentInUser.length >= 1) {
      return res.json(req.business);
    } else {
      return res.status(401).send('You are not associated with this business, access denied');
    }
  });
};

module.exports.updateBusiness = function(req, res) {
  const authorized = Auth.checkToken(req.get('Authorization'));
  if(!authorized.success) {
    return res.status(401).json(authorized.message);
  }

  let decodedJwt = jwt.verify(req.get('Token'), Config.jwtSecret);
  let userId = decodedJwt.data._id;

  User.findById(userId)
  .then(user => {
    // check for the presence of the business within the users businesses array
    const businessPresentInUser = user.businesses.filter(function(business) {
      if(business.businessId === req.business._id) {
        return business;
      }
    });

    if (businessPresentInUser.length >= 1) {
      Business.update(req.business._id, req.body.updates)
      .then(business => {
        if (business.nModified >= 1) {
          res.sendStatus(200);
        } else {
          return res.status(500).send('Business update failed');
        }
      })
      .catch(error => {
        res.status(500).send(error);
      });
    } else {
      return res.status(401).send('You are not associated with this business, access denied');
    }
  });
};
