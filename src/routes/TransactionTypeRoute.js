const { Router } = require('express');
const router = Router();
const TransactionTypeController = require('../controllers/TransactionTypeController');
const UserController = require('../controllers/UserController');

router.get('/getTransactionTypes',UserController.verifyToken, TransactionTypeController.getTransationTypes);
router.get('/getTransactionTypeById/:transactionTypeId',UserController.verifyToken, TransactionTypeController.getTransationTypesbyId);
router.post('/addTransactionType', UserController.verifyToken,TransactionTypeController.addTransactionType);
router.put('/editTransactionType', UserController.verifyToken,TransactionTypeController.editTransactionType);
router.delete('/deleteTransactionType/:transactionTypeId', UserController.verifyToken,TransactionTypeController.deleteTransactionType);

module.exports = router;