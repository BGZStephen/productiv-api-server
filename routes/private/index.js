const router = require('express').Router();
const users = require('./users');
const colours = require('./colours');

// Users
router.get('/users', users.getAll);

// Palettes
// router.delete('/colours/:id', colours.deleteColour);

module.exports = router;
