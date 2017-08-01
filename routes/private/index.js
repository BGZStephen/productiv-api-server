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

// Colour library
router.put('/colour-library/:colourLibraryId/colours/:colourId', colourLibrary.addColour)
router.delete('/colour-library/:colourLibraryId/colours/:colourId', colourLibrary.deleteColour)

// Palettes
router.post('/palettes', palettes.createPalete);
router.get('/palettes', palettes.getUserPalettes);
router.get('/palettes/:paletteId', palettes.getUserPalete);
router.delete('/paletes/:paletteId', palettes.deleteUserPaltete);
router.put('/palettes/:paletteId', palettes.updatePalette);
router.put('/palettes/:paletteId/colours', colours.addToPalette);
router.delete('/palettes/:paletteId/colours/:colourId', colours.removeFromPalette);

// Business
router.all('/businesses/*', CheckToken);
router.post('/businesses', Businesses.create);
router.get('/businesses/:businessId**', Loaders.loadParameters);
router.get('/businesses/:businessId', Businesses.getOne);
router.put('/businesses/:businessId', Businesses.updateOne);

// Colours
router.post('/colours', colours.createColour);
router.get('/colours', Colours.getAll);
router.get('/colours/:id', Colours.getOne);

module.exports = router;
