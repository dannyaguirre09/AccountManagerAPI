const { Router } = require('express');
const router = Router();
const TransactionController = require('../controllers/TransactionController');

// api/transactions/

router.get('/getTransaction', TransactionController.getTransactions); //?accountId&transactionTypeId
router.get('/getSumTransaction', TransactionController.getSumTransactions); //?accountId&transactionTypeId
router.post('/addTransaction', TransactionController.createTransaction);
router.put('/editTransaction', TransactionController.editTransaction);
router.delete('/deleteTransaction', TransactionController.deleteTransaction); //?transactionId

module.exports = router;