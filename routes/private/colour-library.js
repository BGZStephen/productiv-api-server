const ColourLibrary = require('../../models/colours/colour-library');
const winston = require('winston');

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

async function getByUserId(req, res) {
  if(!req.user) {
    winston.log('debug', 'User ID not present')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_USER'})
  }

  try {
    const colourLibraries = await ColourLibrary.find({createdBy: req.user._id});
    if (colourLibrary.length >= 1) {
      return res.status(200).json(colourLibraries);
    } else {
      winston.log('debug', 'Colour libraries not found (endpoint)');
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
  getByUserId
}
