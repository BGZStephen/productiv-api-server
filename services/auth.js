const Config = require('../config');
const winston = require('winston');

'user strict';

function checkToken(req, res, next) {
  const authToken = req.get('Authorization')

  if(!authToken) {
    winston.log('debug', 'Token not supplied');
    res.sendStatus(403)
  }

  if (authToken != Config.siteAuthToken && authToken != Config.adminAuthToken) {
    winston.log('debug', 'Auth tokens don\'t match any tokens in config');
    res.sendStatus(403)
  }

  next()
};


module.exports = {
  checkToken,
};
