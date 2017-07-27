const router = require('express').Router();
const users = require('./users');
const businesses = require('./businesses');
const colours = require('./colours')
const palettes = require('./palettes')

// Users
router.post('/users', users.createUser);
router.post('/users/authenticate', users.authenticate);
router.all('/users/:id**', users.loadUser);
router.delete('/users/:id', users.deleteUser);
router.get('/users/:id', users.getUser);
router.put('/users/:id', users.updateUser);

// -- Colours
router.post('/users/:id/palettes/:id/colours', colours.addToPalette);
router.delete('/users/:userId/palettes/:paletteId/colours/:colourId', colours.removeFromPalette);
// -- Palettes
router.post('/users/:userId/palettes', palettes.createPalete);
router.get('/users/:userId/palettes', palettes.getUserPalettes);
router.get('/users/:userId/palettes/:id', palettes.getUserPalete);
router.delete('/users/:userId/paletes/:paletteId', palettes.deleteUserPaltete);
router.put('/users/:userId/palettes/:paletteId', palettes.updatePalette);

// Users - end

// Business
router.post('/businesses', businesses.createBusiness);
router.get('/businesses/:id', businesses.getBusiness);
router.put('/businesses/:id', businesses.updateBusiness);

// Colors
router.get('/colours', colours.gteAllColours);
router.get('/colours/:id', colours.getColour);
router.post('/colours', colours.createColour);

module.exports = router;
