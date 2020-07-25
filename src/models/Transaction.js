const { DataTypes } = require('sequelize');
const sequelize = require('../util/Connection');

const Transaction = sequelize.define('Transaction', {
    transactionId : { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    accountId : { type: DataTypes.INTEGER, allowNull: false },
    transactionTypeId : { type: DataTypes.INTEGER, allowNull: false},
    transactionAmount : { type: DataTypes.DECIMAL, allowNull: false},
    transactionDescription : { type: DataTypes.STRING },
    transactionDate : { type: DataTypes.DATE },
    creationDate: { type: DataTypes.DATE },
    modificationDate: { type: DataTypes.DATE },
    status: { type: DataTypes.BOOLEAN }
}, {timestamps: false, freezeTableName: true } );

module.exports = Transaction;