const router = require('express').Router();
const Users = require('./users');

router.get('/users', Users.getAll);

module.exports = router;
