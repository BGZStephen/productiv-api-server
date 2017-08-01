const ColourLibrary = require('../../models/colours/colour-library');
const winston = require('winston');

async function addColour(req, res) {
  if(!req.user || req.colour || req.colourLibrary) {
    winston.log('debug', 'Parameter not present')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_USER'})
  }

  req.colourLibrary.colours.push(req.colour)
  req.colourLibrary.markModified('colours')
  req.colourLibrary.save();
  res.json(colourLibrary);
}

async function removeColour(req, res) {
  if(!req.user || req.colour || req.colourLibrary) {
    winston.log('debug', 'Parameter not present')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_USER'})
  }

  const colourInLibrary = req.colourLibrary.colours.indexOf(req.colour)
  if(!colourInLibrary || colourInLibrary === -1) {
    winston.log('debug', 'Colour not in library')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_COLOUR_IN_LIB'})
  }

  req.colourLibrary.colours.splice(colourInLibrary, 1)
  req.colourLibrary.markModified('colours')
  req.colourLibrary.save();
  res.json(colourLibrary);
}

async function create(req, res) {
  if(!req.user) {
    winston.log('debug', 'User ID not present')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_USER'})
  }

  try {
    const colourLibrary = await new ColourLibrary({
      createdBy: req.user._id,
      createdOn: new Date(),
      name: req.body.name,
      description: req.body.description
    }).save()

    res.sendStatus(200);
  } catch (error) {
    winston.log('debug', error);
    res.sendStatus(500)
  }
}

async function deleteOne(req, res) {
  if(!req.user) {
    winston.log('debug', 'User ID not present')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_USER'})
  }

  try {
    const colourLibrary = req.colourLibrary;
    if (colourLibrary.createdBy != req.user._id) {
      winston.log('debug', 'Use tried deleting a colour library that doesn\'t belong to them');
      return res.status(401)
    }

    await colourLibrary.remove()
    res.sendStatus(200)    ;;

  } catch (error) {
    winston.log('debug', error);
    res.sendStatus(500);
  }
}

async function getOne(req, res) {
  if(!req.user) {
    winston.log('debug', 'User ID not present')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_USER'})
  }

  try {
    const colourLibrary = req.colourLibrary;
    if (colourLibrary) {
      return res.status(200).json(colourLibrary);
    } else {
      winston.log('debug', 'Colour library not present in endpoint');
      res.sendStatus(404);
    }
  } catch (error) {
    winston.log('debug', error);
    res.sendStatus(500)
  }
}

module.exports = {
  create,
  deleteOne,
  getOne,
  addColour,
  removeColour
}
