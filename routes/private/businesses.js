const Config = require('../../config');
const jwt = require('jsonwebtoken');
const Business = require('../../models/business');

module.exports.createBusiness = async function(req, res) {
    const authorized = await Auth.checkToken(req.get('Authorization'));
    if(!authorized.success) {
      return res.status(401).json(authorized.message);
    }

    try {
      await businessObject.save(new Business(req.body.business))
      res.sendStatus(200)
    } catch (error) {
      res.status(500).send(error)
    }
  };
};

module.exports.getBusiness = async function(req, res) {
  try {
    const business = await Business.findById(req.business._id)
    const businessPresentInUser = user.businesses.filter(function(business) {
      if(business.businessId === req.business._id) return business;
    });

    if (businessPresentInUser.length === 0) {
      return res.status(401).send('You are not associated with this business, access denied');
    }
    res.json(req.business);
  } catch (error) {
    res.status(500).send(error)
  }
};

module.exports.updateBusiness = async function(req, res) {
  try {
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
  } catch (error) {
    res.status(500).send(error)
  }
};
