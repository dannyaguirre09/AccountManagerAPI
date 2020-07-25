const { DataTypes } = require('sequelize');
const sequelize  = require('../util/Connection');
const Transaction = require('./Transaction');

const Account = sequelize.define( 'Account', {
    accountId:{ type: DataTypes.INTEGER,  primaryKey: true, autoIncrement: true },
    userId:{ type: DataTypes.INTEGER  },
    accountName:{ type: DataTypes.STRING  },
    accountDescription:{type: DataTypes.STRING  },
    creationDate:{  type: DataTypes.DATE, defaultValue: new Date() },
    modificationDate:{ type: DataTypes.DATE  },
    status:{ type: DataTypes.BOOLEAN}
}, { timestamps: false, freezeTableName: true });

Account.hasMany(Transaction, { foreignKey: 'accountId', sourceKey: 'accountId'});
Transaction.belongsTo(Account, {foreignKey: 'accountId', sourceKey: 'accountId'});

module.exports = Account;   