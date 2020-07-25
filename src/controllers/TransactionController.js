const Transaction = require('../models/Transaction');
const Validation = require('../util/Validation');
const TransactionController = {};

//Function to create a transaction
TransactionController.createTransaction = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to create a transaction: ', status = 500, data = {}; 
    try {
        const { error } = Validation.TransactionValidation(req.body);
        if (! error ) {
            const {accountId, transactionTypeId, transactionAmount, transactionDescription, transactionDate} = req.body;
            const newTransaction = await Transaction.create({
                accountId, transactionTypeId, transactionAmount, transactionDescription, transactionDate });
            if ( newTransaction ) {
                message = 'Transaction has been created successfully';
                status = 200;
                data = newTransaction ;
            }
        } else
            message = message + error.details[0].message; 
    } catch (err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

//Funtion to get information about transactions
TransactionController.getTransactions = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to get a transactions: ', status = 500, data = {};
    try {
        const { accountId, transactionTypeId }  = req.query;
        var transactions;
        if(transactionTypeId) 
            transactions = await Transaction.findAll({ where: { accountId, transactionTypeId ,status: true } })
        else   
            transactions = await Transaction.findAll({ where: { accountId, status: true } })
        if(transactions.length > 0) {
            message = 'Successfully',
            status = 200;
            data = transactions;
        } else{
            if(transactionTypeId)
                message = message + 'Failed to find records with accountId=' + accountId + ' and transactionTypeId='+transactionTypeId;
            else 
            message = message + 'Failed to find records with accountId=' + accountId ;
            status = 404;
        }
    } catch (err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

//Funtion to get sum of transactions
TransactionController.getSumTransactions = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to get a sum of transactions: ', status = 500, data = {};
    try {
        const { accountId, transactionTypeId }  = req.query;
        var transactions;
        if(transactionTypeId) 
            transactions = await Transaction.sum( 'transactionAmount',{ where: { accountId, transactionTypeId ,status: true } })
        else   
            transactions = await Transaction.sum('transactionAmount',{ where: { accountId, status: true } })
        if(transactions) {
            message = 'Successfully',
            status = 200;
            data = transactions;
        } else{
            if(transactionTypeId)
                message = message + 'Failed to find records with accountId=' + accountId + ' and transactionTypeId='+transactionTypeId;
            else 
            message = message + 'Failed to find records with accountId=' + accountId ;
            status = 404;
        }
    } catch (err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

//Function to edit a transaction
TransactionController.editTransaction = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to edit a transaction: ', status = 500, data = {};
    try {
        const { error } = Validation.EditTransactionValidation(req.body);   
        if(! error) {
            const {transactionId, transactionAmount, transactionTypeId, transactionDescription, transactionDate} = req.body;
            const transaction = await Transaction.findOne({ where: {transactionId, status:true}}); 
            if ( transaction != null) {
                const transactionEdited = await Transaction.update({
                    transactionTypeId, transactionAmount, transactionDescription, transactionDate }, { where: {transactionId}});
                message = 'Transaction was updated successfully. ';
                status = 200;
                data = 'Rows Affected = ' + transactionEdited;
            } else {
                message = 'Failed to find records with transactionId =  ' + transactionId;
                status = 404;
            }
        } else 
            message = message + error.details[0].message; 
    } catch(err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

//Function to delete an account
TransactionController.deleteTransaction = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to delete a transaction: ', status = 500, data = {};
    try {
        const { transactionId } = req.query;
        const transaction = await Transaction.findOne({ where: {transactionId, status: true } });
        if(transaction != null) {
            const deleteTransaction = await  Transaction.update({ status: false }, { where: {transactionId}});    
            message = "Transaction was deleted successfully";
            status = 200;
            data = 'Rows affected = ' + transaction;
        } else {
            message = 'Failed to find records with transactionId =  ' + deleteTransaction;
            status = 404;
        }
    } catch(err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

module.exports = TransactionController;