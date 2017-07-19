const router = require('express').Router();
const Users = require('./users');

router.delete('/users/:userId', Users.deleteUser);
router.get('/users/:userId', Users.getUser);
router.post('/users', Users.create);
router.post('/users/authenticate', Users.authenticate);
router.put('/users/:userId', Users.update);

module.exports = router;
