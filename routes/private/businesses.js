const Config = require('../../config');
const jwt = require('jsonwebtoken');
const Business = require('../../models/business');

async function create(req, res) {
  const authorized = await Auth.checkToken(req.get('Authorization'));
  if(!authorized.success) {
    winston.log('debug', 'User failed authorized check');
    return res.status(401).json(authorized.message);
  }

  try {
    await businessObject.save(new Business(req.body.business))
    res.sendStatus(200)
  } catch (error) {
    winston.log('debug', 'Business creation failed');
    res.status(500).send(error)
  }
};

async function getOne(req, res) {
  try {
    const business = await Business.findById(req.business._id)
    const businessPresentInUser = user.businesses.filter(function(business) {
      if(business.businessId === req.business._id) return business;
    });

    if (businessPresentInUser.length === 0) {
      winston.log('debug', 'Business not present in users array of businesses');
      return res.status(401).send('You are not associated with this business, access denied');
    }
    res.json(req.business);
  } catch (error) {
    winston.log('debug', error);
    res.status(500).send(error)
  }
};

async function updateOne(req, res) {
  try {
    const Business = await Business.findById(req.business._id)
    const businessPresentInUser = user.businesses.filter(function(business) {
      if(business.businessId === req.business._id) return business;
    });

    if (businessPresentInUser.length == 0) {
      winston.log('debug', 'Business not present in users array of businesses');
      return res.status(401).send('You are not associated with this business, access denied');
    }

    const updatedBusiness = await Business.update(req.business._id, req.body.updates)
    if (updatedBusiness.nModified >= 1) {
      return res.sendStatus(200);
    } else {
      winston.log('debug', 'Failed to update business');
      return res.status(500).send('Business update failed');
    }
  } catch (error) {
    winston.log('debug', error);
    res.status(500).send(error)
  }
};

module.exports = {
  create,
  getOne,
  updateOne
}
