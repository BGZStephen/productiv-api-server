const router = require('express').Router();
const CheckToken = require('../../services/auth').checkToken;
const Loaders = require('../../services/loaders');
const Colours = require('./colours');
const ColourLibrary = require('./colour-library');
const Users = require('./users');

// Colours
router.delete('/colours/:id', colours.deleteColour);

module.exports = router;
