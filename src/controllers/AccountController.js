const Account = require('../models/Account')
const Transaction = require('../models/Transaction');
const { Sequelize } = require('sequelize');
const Validation = require('../util/Validation');
const AccountController = {};
const sequelize = new Sequelize({ dialect:'mysql' });

//Function to create account
AccountController.createAccount = async (req, res) => {   
    var message = 'An ocurreded a problem when we tried to create an account: ', status = 500, data = {}; 
    try {
        const { error } = Validation.AccountValidation(req.body);
        if(!error) {
            const { userId, accountName, accountDescription }  = req.body;
            const newAccount = await Account.create({ userId, accountName, accountDescription } );
            if(newAccount) {
                message = 'Account has been created successfully';
                status = 200;
                data = newAccount ;
            } 
        } else 
            message = message + error.details[0].message; 
    } catch(err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

//Function to get information about an account by userId
AccountController.getAccountByUserId = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to get an accounts: ', status = 500, data = {};
    try {
        const { userId } = req.params;
        const accounts = await Account.findAll({ where: {  userId, status: true } })
        if(accounts.length > 0) {
            message = 'Successfully',
            status = 200;
            data = accounts;
        } else{
            message = message + 'Failed to find records with userId=' + userId;
            status = 404;
        }
    } catch (err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

//Funtion to get information about a account  by accountId
AccountController.getAccountByAccountId = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to get an account: ', status = 500, data = {};
    try {
        const { accountId } = req.params;
        const account = await Account.findOne({ where: {  accountId, status: true } })
        if(account != null) {
            message = 'Successfully',
            status = 200;
            data = account;
        } else{
            message = message + 'Failed to find records with accountId=' + accountId;
            status = 404;
        }
    } catch (err) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
}

//Function to edit an account 
AccountController.editAccount = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to edit an account: ', status = 500, data = {};
    try {
        const { error } = Validation.EditAccountValidation(req.body);   
        if ( !error) {
            const { accountId, userId, accountName, accountDescription } = req.body;                        
            const account = await Account.findOne({ where: {accountId, userId, status:true}});
            if(account != null) {
                const accountEdited = await Account.update({ userId, accountName, accountDescription },{where: {
                    accountId
                }});
                message = 'Account was updated successfully. ';
                status = 200;
                data = 'Rows Affected = ' + accountEdited;
            } else {
                message = 'Failed to find records with accountId =  ' + accountId + ' and userId = ' + userId;
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
AccountController.deleteAccount = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to delete an account: ', status = 500, data = {};
    const t = await sequelize.transaction(); 
    try {
        const { accountId } = req.params;
        const account = await Account.findOne({ where: {accountId, status: true } });
        if(account != null) {
            const deleteAccount = await  Account.update({ status: false }, { where: {accountId} }, {transaction: t});
            const deleteTransaction = await Transaction.update({ status: false }, { where: {accountId}}, {transaction: t});
            await t.commit();
            message = "Account was deleted successfully";
            status = 200;
            data = 'Rows affected = ' + (parseInt(deleteAccount) + parseInt(deleteTransaction));
        } else {
            message = 'Failed to find records with accountId =  ' + accountId;
            status = 404;
        }
    } catch(err) {
        await t.rollback();
        message = message + err;
    }
    res.status(status).json({ status, message, data });
};

module.exports = AccountController; 