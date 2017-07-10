const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Config = require('../config')

// user Schema
const UserSchema = mongoose.Schema({
  created_on: Date,
  email: {
    required: true,
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: String,
  role: String
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.create = function(userObject) {

  // has password before storing in database
  userObject.password = bcrypt.hashSync(userObject.password, 8)
  return new Promise((resolve, reject) => {
    userObject.save().then(user => {
      if(user != null) {
        resolve(user)
      } else {
        reject("User creation failed")
      }
    })
  })
}

module.exports.delete = function(userId) {
  return new Promise((resolve, reject) => {
    User.findOne({_id: userId}).delete().then(user => {
      if(JSON.parse(user).n == 1) {
        resolve()
      } else {
        reject("User deletion failed")
      }
    })
  })
}

module.exports.getAll = function() {
  return new Promise((resolve, reject) => {
    User.find({}).delete().then(users => {
      if(users.length != 0) {
        resolve(users)
      } else {
        reject("Unable to retrieve users")
      }
    })
  })
}

module.exports.getOne = function(userId) {
  return new Promise((resolve, reject) => {
    User.findOne({_id: userId}).then(user => {
      if(user != null) {
        resolve(user)
      } else {
        reject("Unable to retrieve user")
      }
    })
  })
}

module.exports.update = function(userObject) {
  return new Promise((resolve, reject) => {
    User.update({_id: userObject._id}, userObject).then(user => {
      if(user.nModified >= 1) {
        resolve()
      } else {
        reject("User update failed")
      }
    })
  })
}
