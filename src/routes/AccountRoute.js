const { Router } = require('express');
const router = Router();
const AccountController = require('../controllers/AccountController');
const UserController = require('../controllers/UserController');

// /api/accounts

router.get('/getAccountsByUser/',UserController.verifyToken ,AccountController.getAccountByUserId);
router.get('/getAccountByAccountId/:accountId',UserController.verifyToken, AccountController.getAccountByAccountId);
router.post('/addAccount', UserController.verifyToken,AccountController.createAccount )
router.put('/editAccount', UserController.verifyToken,AccountController.editAccount);
router.delete('/deleteAccount/:accountId', UserController.verifyToken,AccountController.deleteAccount);


module.exports = router;    
