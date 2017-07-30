const Config = require('../config');

'user strict';

function checkToken(req, res, next) {
  const authToken = req.get('Authorization')

  if(!authToken) {
    console.log('Token not supplied');
    res.sendStatus(403)
  }

  if (authToken != Config.siteAuthToken && authToken != Config.adminAuthToken) {
    console.log('Auth tokens don\'t match any tokens in config');
    res.sendStatus(403)
  }

  next()
};


module.exports = {
  checkToken,
};
