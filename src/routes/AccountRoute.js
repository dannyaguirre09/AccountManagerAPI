const { Router } = require('express');
const router = Router();
const AccountController = require('../controllers/AccountController');

// /api/accounts

router.get('/getAccountsByUserId/:userId', AccountController.getAccountByUserId);
router.get('/getAccountByAccountId/:accountId', AccountController.getAccountByAccountId);
router.post('/addAccount', AccountController.createAccount )
router.put('/editAccount', AccountController.editAccount);
router.delete('/deleteAccount/:accountId', AccountController.deleteAccount);


module.exports = router;