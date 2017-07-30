const router = require('express').Router();
const loaders = require('../../services/loaders')
const users = require('./users');
const businesses = require('./businesses');
const colours = require('./colours')
const palettes = require('./palettes')
const colourLibrary = require('./colour-library')

// Users -- start
router.post('/users', users.createUser);
router.post('/users/authenticate', users.authenticate);

module.exports = router;
