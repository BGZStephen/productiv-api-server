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
  const processCreateBusiness = async function() {
    const authorized = await Auth.checkToken(req.get('Authorization'));
    if(!authorized.success) return res.status(401).json(authorized.message);

    businessObject.save(new Business(req.body.business))
    .then(res.sendStatus(200))
  };

  processCreateBusiness()
  .catch(error => res.status(500).send(error));
};

module.exports.getBusiness = function(req, res) {
  const processGetBusiness = async function() {
    const authorized = Auth.checkToken(req.get('Authorization'));
    if(!authorized.success) return res.status(401).json(authorized.message);

    const business = await Business.findById(req.business._id)
    const businessPresentInUser = user.businesses.filter(function(business) {
      if(business.businessId === req.business._id) return business;
    });

    if (businessPresentInUser.length === 0) return res.status(401).send('You are not associated with this business, access denied');

    return res.json(req.business);
  }

  processGetBusiness()
  .catch(error => res.status(500).send(error))
};

module.exports.updateBusiness = function(req, res) {
  const processUpdateBusiness = async function() {
    const authorized = Auth.checkToken(req.get('Authorization'));
    if(!authorized.success) return res.status(401).json(authorized.message);

    const Business = await Business.findById(req.business._id)
    const businessPresentInUser = user.businesses.filter(function(business) {
      if(business.businessId === req.business._id) return business;
    });

    if (businessPresentInUser.length == 0) return res.status(401).send('You are not associated with this business, access denied');

    const updatedBusiness = await Business.update(req.business._id, req.body.updates)
    if (updatedBusiness.nModified >= 1) {
      return res.sendStatus(200);
    } else {
      return res.status(500).send('Business update failed');
    }
  }

  processUpdateBusiness()
  .catch(error => res.status(500).send(error))
};
