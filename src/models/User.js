const { DataTypes } = require('sequelize');
const sequelize = require('../util/Connection');
const Account = require('./Account')
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userName: { type: DataTypes.STRING },
    userLastName: { type: DataTypes.STRING },
    userEmail: { type: DataTypes.STRING },
    userUserName: { type: DataTypes.STRING },
    userPassword: { type: DataTypes.STRING },
    creationDate: { type: DataTypes.DATE },
    modificationDate: { type: DataTypes.DATE },
    status: { type: DataTypes.BOOLEAN },
}, {
    timestamps: false,
    freezeTableName: true,
    hooks: {
        beforeCreate: async (User) => {
            User.userPassword = await bcrypt.hashSync(User.userPassword, 10);
        }
    }
});

User.hasMany(Account, { foreignKey: 'userId', sourceKey: 'userId' });
Account.belongsTo(User, { foreignKey: 'userId', sourceKey: 'userId' });

module.exports = User;