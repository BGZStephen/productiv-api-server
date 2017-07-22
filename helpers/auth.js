const Config = require('../config')

'user strict'

const checkToken = function(authToken) {
  if(authToken === undefined || authToken === null) {
    return {success: false, message: {error: 'Authorisation token not supplied'}};
  }

  if (authToken != Config.siteAuthToken && authToken != Config.adminAuthToken) {
    return {success: false, message: {error: 'Unauthorized access, access denied'}};
  }

  if (authToken == Config.siteAuthToken) {
    return {success: true, accessedRoute: 'site'};
  }

  if (authToken == Config.adminAuthToken) {
    return {success: true, accessedRoute: 'admin'};
  }
};

module.exports = {
  checkToken,
};
