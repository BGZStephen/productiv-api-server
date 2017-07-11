const Config = require('../config')
const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')

module.exports = router

router.post("", (req, res, next) => {

  if(!req.query.siteAuthToken) {
    return res.status(401).json({error: "Authorisation token not supplied"})
  } else if(req.query.siteAuthToken != Config.siteAuthToken) {
    return res.status(401).json({error: "Unauthorized access, access denied"})
  } else {
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
  }
})

router.post("/authenticate", (req, res, next) => {

  if(!req.get('Authorization')) {
    return res.status(401).json({error: "Authorisation token not supplied"})
  } else if(req.get('Authorization') != Config.siteAuthToken) {
    return res.status(401).json({error: "Unauthorized access, access denied"})
  } else {
    let email = req.body.email
    let queryPassword = req.body.password

    User.getOne({email: email})
    .then(user => {
      bcrypt.compare(queryPassword, user.password)
      .then((authResult) => {
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
      })
    })
    .catch(error => {
      res.status(500).json({error: error})
    })
  }
})

router.get("/:userId", (req, res, next) => {

  if(!req.get('Authorization')) {
    return res.status(401).json({error: "Authorisation token not supplied"})
  } else if(req.get('Authorization') != Config.siteAuthToken) {
    return res.status(401).json({error: "Unauthorized access, access denied"})
  } else {

    let token = req.get('Token')
    let decoded = jwt.verify(token, Config.jwtSecret)
    let userId = decoded.data._id

    // check to ensure user is only able to access their own user profile, even if other id is entered as query param
    if(userId != req.params.userId) {
      return res.status(403).json({error: "Unauthorized access, access denied"})
    } else {
      User.getOne({_id: userId})
      .then(user => {
        res.json({
          _id: user._id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        })
      })
      .catch(error => {
        res.status(500).json({error: error})
      })
    }
  }
})

router.get("", (req, res, next) => {
  if(!req.get('Authorization')) {
    return res.status(401).json({error: "Authorisation token not supplied"})
  } else if(req.get('Authorization') != Config.adminAuthToken) {
    return res.status(401).json({error: "Unauthorized access, access denied"})
  } else {
    User.getAll()
    .then(users => {
      res.json(users)
    })
    .catch(error => {
      res.status(500).json({error: error})
    })
  }
})
