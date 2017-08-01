const Palette = require('../../models/colours/palette');

async function create(req, res) {
  if(!req.user) {
    winston.log('debug', 'User ID not present')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_USER'})
  }

  try {
    const palette = await new Palette({
      createdBy: req.user._id,
      createdOn: new Date(),
      colours: [],
    }).save()

    res.sendStatus(200);
  } catch (error) {
    winston.log('debug', error);
    res.sendStatus(500)
  }
}

async function deleteOne(req, res) {
  if(!req.user || !req.palette) {
    winston.log('debug', 'Parameter not present')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_USER'})
  }

  try {
    const palette = req.palette;
    if (palette.createdBy != req.user._id) {
      winston.log('debug', 'Use tried deleting a palette that doesn\'t belong to them');
      return res.status(401)
    }

    await palette.remove()
    res.sendStatus(200)    ;;

  } catch (error) {
    winston.log('debug', error);
    res.sendStatus(500);
  }
}

async function getOne(req, res) {
  if(!req.user || !req.palette) {
    winston.log('debug', 'Parameter not present')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_USER'})
  }

  try {
    const palette = req.palette;
    if (palette) {
      return res.status(200).json(palette);
    } else {
      winston.log('debug', 'Palette not present in endpoint');
      res.sendStatus(404);
    }
  } catch (error) {
    winston.log('debug', error);
    res.sendStatus(500)
  }
}

async function getByUserId(req, res) {
  if(!req.user || !req.palette) {
    winston.log('debug', 'Parameter not present')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_USER'})
  }

  try {
    const palettes = await Palette.find({createdBy: req.user._id});
    if (palettes.length >= 1) {
      return res.status(200).json(palettes);
    } else {
      winston.log('debug', 'Palettes not found (endpoint)');
      res.sendStatus(404);
    }
  } catch (error) {
    winston.log('debug', error);
    res.sendStatus(500)
  }
}

async function updateOne(req, res) {
  if(!req.user || !req.palette) {
    winston.log('debug', 'Parameter not present')
    return res.status(500).send({message: 'A system error has occured, please contact support', code: 'PROD_NO_USER'})
  }

	const palette = await Palette.update({_id: req.palette._id}, req.body.updates)
	if (palette.nModified >= 1) {
		return res.json(palette);
	} else {
		winston.log('debug', 'User update failed');
		return res.status(500).send('User update failed');
	}

};

module.exports = {
  getByUserId
}
