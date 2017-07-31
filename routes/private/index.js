const router = require('express').Router();
const CheckToken = require('../../services/auth').checkToken;
const Loaders = require('../../services/loaders');
const Businesses = require('./businesses')
const Colours = require('./colours');
const ColourLibrary = require('./colour-library');
const Users = require('./users');

// Users
router.all('/users/:userId*', CheckToken, Loaders.loadParameters);
router.delete('/users/:userId', Users.deleteOne);
router.get('/users/:userId', Users.getOne);
router.put('/users/:userId', Users.updateOne);

// -- Colour library
// router.put('/users/:userId/colour-library/:colourLibraryId/colours/:colourId', colourLibrary.addColour)
// router.delete('/users/:userId/colour-library/:colourLibraryId/colours/:colourId', colourLibrary.addColour)
// -- Colours
// router.post('/users/:userId/colours', colours.createColour);
// router.put('/users/:userId/palettes/:paletteId/colours', colours.addToPalette);
// router.delete('/users/:userId/palettes/:paletteId/colours/:colourId', colours.removeFromPalette);
// -- Palettes
// router.post('/users/:userId/palettes', palettes.createPalete);
// router.get('/users/:userId/palettes', palettes.getUserPalettes);
// router.get('/users/:userId/palettes/:paletteId', palettes.getUserPalete);
// router.delete('/users/:userId/paletes/:paletteId', palettes.deleteUserPaltete);
// router.put('/users/:userId/palettes/:paletteId', palettes.updatePalette);

// Users - end

// Business
router.all('/businesses/*', CheckToken);
router.post('/businesses', Businesses.create);
router.get('/businesses/:businessId**', Loaders.loadParameters);
router.get('/businesses/:businessId', Businesses.getOne);
router.put('/businesses/:businessId', Businesses.updateOne);

// Colours
router.get('/colours', Colours.getAll);
router.get('/colours/:id', Colours.getOne);

module.exports = router;
