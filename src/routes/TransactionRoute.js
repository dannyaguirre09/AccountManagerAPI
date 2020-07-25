const { Router } = require('express');
const router = Router();
const TransactionController = require('../controllers/TransactionController');
const UserController = require('../controllers/UserController');

// api/transactions/

router.get('/getTransaction', UserController.verifyToken ,TransactionController.getTransactions); //?accountId&transactionTypeId
router.get('/getSumTransaction', UserController.verifyToken,TransactionController.getSumTransactions); //?accountId&transactionTypeId
router.post('/addTransaction', UserController.verifyToken,TransactionController.createTransaction);
router.put('/editTransaction', UserController.verifyToken,TransactionController.editTransaction);
router.delete('/deleteTransaction', UserController.verifyToken,TransactionController.deleteTransaction); //?transactionId

module.exports = router;