const { DataTypes } = require('sequelize');
const sequelize = require('../util/Connection');
const Transaction = require('./Transaction');

const TransactionType = sequelize.define('TransactionType', {
    transactionTypeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    transactionTypeName: { type: DataTypes.STRING, allowNull: false},
    transactionTypeDescription: { type: DataTypes.STRING},
    creationDate:{  type: DataTypes.DATE },
    modificationDate:{ type: DataTypes.DATE  },
    status:{ type: DataTypes.BOOLEAN}
}, {timestamps: false, freezeTableName: true});

TransactionType.hasMany(Transaction, { foreignKey: 'transactionTypeId', sourceKey: 'transactionTypeId'});
Transaction.belongsTo(TransactionType, { foreignKey: 'transactionTypeId', sourceKey: 'transactionTypeId'});

module.exports = TransactionType;