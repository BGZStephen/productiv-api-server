const Config = require('../../config');
const Colour = require('../../models/colours/colour');
const winston = require('winston');

async function createColour(req, res) {
  const colourObject = new Colour({
    createdOn: new Date(),
    createdBy: req.body.userId,
    hex: req.body.hex,
    red: req.body.red,
    green: req.body.green,
    blue: req.body.blue,
  })

  try {
    const colour = await colourObject.save()
    res.sendStatus(200);
  } catch(error) {
    winston.log('debug', 'Colour creation failed');
    res.status(500).send(error);
  }
}

function getOne(req, res) {
  res.json(req.colour);
}

async function getAll(req, res) {
  const colours = await Colour.find({});
  if(colours.length > 0) {
    res.json(colours);
  } else {
    winston.log('debug', 'No colours in array');
    res.status(404).send('No colours found');
  }
}

module.exports = {
  createColour,
  getOne,
  getAll
}
