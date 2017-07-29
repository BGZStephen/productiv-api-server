const router = require('express').Router();
const users = require('./users');
const colours = require('./colours');
const loaders = require('../../helpers/loaders');
const checkToken = require('../../helpers/auth').checkToken;

// Users
router.all('/users/:userId*', checkToken, loaders.loadParameters);
router.delete('/users/:userId', users.deleteUser);
router.get('/users/:userId', users.getUser);
router.put('/users/:userId', users.updateUser);

// -- Colour library
// router.put('/users/:userId/colour-library/:colourLibraryId/colours/:colourId', colourLibrary.addColour)
// router.delete('/users/:userId/colour-library/:colourLibraryId/colours/:colourId', colourLibrary.addColour)
// -- Colours
// router.post('/users/:userId/colours', colours.createColour);
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
router.all('/businesses/*', checkToken);
// router.post('/businesses', businesses.createBusiness);
router.get('/businesses/:businessId**', loaders.loadParameters);
// router.get('/businesses/:businessId', businesses.getBusiness);
// router.put('/businesses/:businessId', businesses.updateBusiness);

// Colours
// router.get('/colours', colours.getAllColours);
// router.get('/colours/:id', colours.getColour);

// Palettes
// router.delete('/colours/:id', colours.deleteColour);

module.exports = router;
