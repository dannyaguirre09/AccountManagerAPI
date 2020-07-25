const TransactionType = require('../models/TransactionType');
const { Sequelize } = require('sequelize');
const Transaction = require('../models/Transaction');
const Validation = require('../util/Validation');
const sequelize = new Sequelize({ dialect:'mysql' });
const TransactionTypeController = {}

//Function to create a TransactionType 
TransactionTypeController.addTransactionType = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to create a Transaction Type: ', status = 500, data = {}; 
    try {
        const { error } = Validation.TransactionTypeValidation(req.body);
        if (! error) {
            const { transactionTypeName, transactionTypeDescription } = req.body;
            const newtTransactionType = await TransactionType.create({
                                                                            transactionTypeName, transactionTypeDescription});
            if(newtTransactionType) {
                message = 'TransactionType has been created successfully';
                status = 200;
                data = newtTransactionType ;
            }
        } else 
            message = message + error.details[0].message; 
    } catch(err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

//Function to get information about TransactionTypes
TransactionTypeController.getTransationTypes = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to get Transaction Types: ', status = 500, data = {}; 
    try {
        const records = await TransactionType.findAll({ where: {  status: 1 } });
        if(records.length > 0) {
            message = 'Successfully',
            status = 200;
            data = records;
        } else{
            message = 'We did not found records';
            status = 200;
        }
    } catch(err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

//Function to get information about  a TransactionType
TransactionTypeController.getTransationTypesbyId = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to get a Transaction Type: ', status = 500, data = {}; 
    try {
        const { transactionTypeId } = req.params;
        const records = await TransactionType.findOne({ where: {  transactionTypeId, status: true } } ); 
        if(records   != null) {
            message = 'Successfully',
            status = 200;
            data = records;
        } else{
            message = 'We did not found records with transactionTypeId = ' + transactionTypeId;
            status = 200;
        }
    } catch(err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

//Function to edit TransactionType 
TransactionTypeController.editTransactionType = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to edit a Transaction Type: ', status = 500, data = {}; 
    try {
        const { error } = Validation.EditTransactionTypeValidation(req.body);   
        if ( !error) {
            const { transactionTypeId, transactionTypeName, transactionTypeDescription } = req.body;      
            const record = await TransactionType.findOne({ where: {transactionTypeId, status:true}}); 
            if(record != null) {
                const recordEdited = await TransactionType.update({ transactionTypeName, transactionTypeDescription},
                    {where: { transactionTypeId }});
                message = 'TransactionType was updated successfully. ';
                status = 200;
                data = 'Rows Affected = ' + recordEdited;
            }  else {
                message = 'Failed to find records with transactionTypeId =  ' + transactionTypeId;
                status = 404;
            }     
        } else 
            message = message + error.details[0].message;      
    } catch(err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

//Funtion to delete TransactionType
TransactionTypeController.deleteTransactionType = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to delete a Transaction Type: ', status = 500, data = {}; 
    const t = await sequelize.transaction(); 
    try {
        const { transactionTypeId } = req.params;
        const records = await TransactionType.findOne({ where: {transactionTypeId, status: true } });
        if(records != null) {
            const deleteRecord = await  TransactionType.update({ status: false }, { where: {transactionTypeId}}, {transaction: t});
            const deleteTransaction = await Transaction.update({ status: false }, { where: {transactionTypeId}}, {transaction: t});
            await t.commit();
            message = "TransactionType was deleted successfully";
            status = 200;
            data = 'Rows affected = ' + (parseInt(deleteRecord) + parseInt(deleteTransaction));
        } else {
            message = 'Failed to find records with transactionTypeId =  ' + transactionTypeId;
            status = 404;
        }
    } catch(err) {
        await t.rollback();
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

module.exports  = TransactionTypeController;