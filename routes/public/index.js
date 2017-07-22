const router = require('express').Router();
const users = require('./users');

// Users
router.post('/users', users.createUser);
router.all('/users/:userId*', users.loadUser)
router.delete('/users/:userId', users.deleteUser);
router.get('/users/:userId', users.getUser);
router.put('/users/:userId', users.updateUser);
router.post('/users/authenticate', users.authenticate);

// Business


module.exports = router;
