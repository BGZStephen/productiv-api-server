const Config = require('../config')

'user strict'

const routeAuth = function(authToken) {
  if(authToken === undefined || authToken === null) {
    return false;
  } else if (authToken != Config.siteAuthToken && authToken != Config.adminAuthToken) {
    return false;
  } else if (authToken == Config.siteAuthToken) {
    return {
      route: 'site',
    }
  } else if (authToken == Config.adminAuthToken) {
    return {
      route: 'admin',
    }
  }
};

module.exports = {
  routeAuth
};
