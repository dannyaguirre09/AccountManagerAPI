const { Router } = require('express');
const router = Router();
const TransactionTypeController = require('../controllers/TransactionTypeController');

router.get('/getTransactionTypes', TransactionTypeController.getTransationTypes);
router.get('/getTransactionTypeById/:transactionTypeId', TransactionTypeController.getTransationTypesbyId);
router.post('/addTransactionType', TransactionTypeController.addTransactionType);
router.put('/editTransactionType', TransactionTypeController.editTransactionType);
router.delete('/deleteTransactionType/:transactionTypeId', TransactionTypeController.deleteTransactionType);

module.exports = router;