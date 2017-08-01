const router = require('express').Router();
const CheckToken = require('../../services/auth').checkToken;
const Loaders = require('../../services/loaders');
const Businesses = require('./businesses')
const Colours = require('./colours');
const ColourLibrary = require('./colour-library');
const Users = require('./users');
const Palettes = require('./palettes');

// Users
router.all('/users/:userId*', CheckToken, Loaders.loadParameters);
router.delete('/users/:userId', Users.deleteOne);
router.get('/users/:userId', Users.getOne);
router.put('/users/:userId', Users.updateOne);

// Colour library
router.get('/colour-library/:colourLibraryId/', ColourLibrary.getOne)
router.delete('/colour-library/:colourLibraryId/', ColourLibrary.deleteOne)
router.put('/colour-library/:colourLibraryId/colours/:colourId', ColourLibrary.addColour)
router.delete('/colour-library/:colourLibraryId/colours/:colourId', ColourLibrary.removeColour)

// Palettes
router.post('/palettes', Palettes.create);
router.get('/palettes', Palettes.getByUserId);
router.get('/palettes/:paletteId', Palettes.getOne);
router.delete('/paletes/:paletteId', Palettes.deleteOne);
router.put('/palettes/:paletteId', Palettes.updateOne);
router.put('/palettes/:paletteId/colours', Palettes.addColour);
router.delete('/palettes/:paletteId/colours/:colourId', Palettes.removeColour);

// Business
router.all('/businesses/*', CheckToken);
router.post('/businesses', Businesses.create);
router.get('/businesses/:businessId**', Loaders.loadParameters);
router.get('/businesses/:businessId', Businesses.getOne);
router.put('/businesses/:businessId', Businesses.updateOne);

// Colours
router.post('/colours', Colours.createColour);
router.get('/colours', Colours.getAll);
router.get('/colours/:id', Colours.getOne);

module.exports = router;
