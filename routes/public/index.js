const router = require('express').Router();
const users = require('./users');
const business = require('./business')

// Users
router.post('/users', users.createUser);
router.post('/users/authenticate', users.authenticate);
router.all('/users/:userId**', users.loadUser)
router.delete('/users/:userId', users.deleteUser);
router.get('/users/:userId', users.getUser);
router.put('/users/:userId', users.updateUser);

// Business
router.post('/business', business.createBusiness);
router.get('/business/:businessId', business.getBusiness);
router.put('/business/:businessId', business.updateBusiness);


module.exports = router;
