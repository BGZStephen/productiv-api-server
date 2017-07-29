const Config = require('../../config');
const Colour = require('../../models/colours/colour');

module.exports.createColour = function(req, res) {
  const colourObject = new Colour({
    createdOn: new Date(),
    createdBy: req.body.userId,
    hex: req.body.hex,
    red: req.body.red,
    green: req.body.green,
    blue: req.body.blue,
  })

  colourObject.save()
  .then(result => {
    res.json(result)
  })
  .catch(error => {
    res.status(500).send(error)
  })
}

module.exports.getColour = function(req, res) {
  res.json(req.colour);
}

module.exports.getAllColours = async function(req, res) {
  let colours = await Colour.find({});
  if(colours.length > 0) {
    res.json(colours);
  } else {
    res.status(404).send('No colours found');
  }
}
