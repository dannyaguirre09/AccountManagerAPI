const { Router } = require('express');
const UserController = require('../controllers/UserController')
const router = Router();

router.post('/addUser',  UserController.createUser);
router.post('/authenticationUser',  UserController.authenticationUser);
router.get('/getUser/:userId', UserController.getUserById);

module.exports = router;