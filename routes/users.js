const Config = require('../config')
const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')

module.exports = router

router.post("", (req, res, next) => {

  let userObject = new User({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  })

  User.create(userObject)
  .then(user => {
    res.sendStatus(200)
  })
  .catch(error => {
    res.status(500).json({error: error})
  })
})

router.post("/authenticate", (req, res, next) => {

  let email = req.body.email
  let queryPassword = req.body.password

  User.getOne({email: email})
  .then(user => {
    bcrypt.compare(queryPassword, user.password).then((authResult) => {
      if(authResult) {
        let token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365),
          data: {_id: user._id}
        }, Config.jwtSecret);

        let response = {
          token: token,
          last_authenticated: new Date().getTime()
        }

        res.json(response)
      } else {
        res.sendStatus(401)
      }
    });
  })
  .catch(error => {
    res.status(500).json({error: error})
  })
})
