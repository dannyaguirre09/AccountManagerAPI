const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const Validation = {}

//Register Validation
Validation.RegisterValidation = (data) => {
    const schema = Joi.object({
        userName: Joi.string().min(1).max(50).required(),
        userLastName: Joi.string().min(1).max(50).required(),
        userEmail: Joi.string().min(1).max(100).required().email(),
        userUserName: Joi.string().min(5).max(50).required(),
        userPassword: Joi.string().min(8).max(50).required()
    });
    return schema.validate(data);
};

//Login Validation
Validation.LoginValidation = (data) => {
    const schema = Joi.object({
        userUserName: Joi.string().min(5).max(50).required(),
        userPassword: Joi.string().min(8).max(50).required()
    });
    return schema.validate(data);
};

//Account Validation
Validation.AccountValidation = (data) => {
    const schema = Joi.object({
        accountName: Joi.string().min(2).max(50).required(),
        accountDescription: Joi.string().max(100)
    });
    return schema.validate(data);
};

//Edit Account Validation
Validation.EditAccountValidation = (data) => {
    const schema = Joi.object({
        accountId: Joi.number().required(),
        accountName: Joi.string().min(2).max(50).required(),
        accountDescription: Joi.string().max(100)
    });
    return schema.validate(data);
};

//TransactionType Validation
Validation.TransactionTypeValidation = (data) => {
    const schema = Joi.object({
        transactionTypeName: Joi.string().required(),
        transactionTypeDescription: Joi.string()
    });
    return schema.validate(data);
};

//Edit TransactionType Validation
Validation.EditTransactionTypeValidation = (data) => {
    const schema = Joi.object({
        transactionTypeId: Joi.number().required(),
        transactionTypeName: Joi.string().required(),
        transactionTypeDescription: Joi.string()
    });
    return schema.validate(data);
};

//Transaction Validation
Validation.TransactionValidation = (data) => {
    const schema = Joi.object({
        accountId: Joi.number().required(),
        transactionTypeId: Joi.number().required(),
        transactionAmount: Joi.number().required(),
        transactionDescription: Joi.string().max(50),
        transactionDate: Joi.date().format('YYYY-MM-DD').utc().required()
    });
    return schema.validate(data);
};

//Edit Transaction Validation
Validation.EditTransactionValidation = (data) => {
    const schema = Joi.object({
        transactionId: Joi.number().required(),
        transactionTypeId: Joi.number().required(),
        transactionAmount: Joi.number().required(),
        transactionDescription: Joi.string().max(50),
        transactionDate: Joi.date().format('YYYY-MM-DD').utc().required()
    });
    return schema.validate(data);
};

module.exports = Validation;