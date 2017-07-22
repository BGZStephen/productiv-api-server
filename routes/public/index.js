const router = require('express').Router();
const Users = require('./users');

// Users
router.post('/users', Users.create);
router.delete('/users/:userId', Users.deleteUser);
router.get('/users/:userId', Users.getUser);
router.put('/users/:userId', Users.update);
router.post('/users/authenticate', Users.authenticate);

// Business


module.exports = router;
