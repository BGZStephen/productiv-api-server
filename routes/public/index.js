const router = require('express').Router();
const loaders = require('../../helpers/loaders')
const users = require('./users');
const businesses = require('./businesses');
const colours = require('./colours')
const palettes = require('./palettes')
const colourLibrary = require('./colour-library')

// Users -- start
router.post('/users', users.createUser);
router.post('/users/authenticate', users.authenticate);
router.all('/users/:userId*', loaders.loadParameters);
router.delete('/users/:userId', users.deleteUser);
router.get('/users/:userId', users.getUser);
router.put('/users/:userId', users.updateUser);

// -- Colour library
// router.put('/users/:userId/colour-library/:colourId', colourLibrary.addColour)
// router.delete('/users/:userId/colour-library/:colourId', colourLibrary.addColour)
// -- Colours
router.post('/users/:usreId/colours', colours.createColour);
// router.put('/users/:id/palettes/:id/colours', colours.addToPalette);
// router.delete('/users/:userId/palettes/:paletteId/colours/:colourId', colours.removeFromPalette);
// -- Palettes
// router.post('/users/:userId/palettes', palettes.createPalete);
// router.get('/users/:userId/palettes', palettes.getUserPalettes);
// router.get('/users/:userId/palettes/:id', palettes.getUserPalete);
// router.delete('/users/:userId/paletes/:paletteId', palettes.deleteUserPaltete);
// router.put('/users/:userId/palettes/:paletteId', palettes.updatePalette);

// Users - end

// Business
// router.post('/businesses', businesses.createBusiness);
// router.get('/businesses/:id', businesses.getBusiness);
// router.put('/businesses/:id', businesses.updateBusiness);

// Colours
router.get('/colours', colours.getAllColours);
router.get('/colours/:id', colours.getColour);

module.exports = router;
