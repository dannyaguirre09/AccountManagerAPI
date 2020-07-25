const express = require('express');
const morgan  = require('morgan');
const UserRoute  = require('./routes/UserRoute');
const AccountRoute = require('./routes/AccountRoute');
const TransactionRoute = require('./routes/TransactionRoute');
const TransactionTypeRoute = require('./routes/TransactionTypeRoute');
const bodyParser=require('body-parser');

//Initialization
const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routes
app.use('/api/users', UserRoute); 
app.use('/api/accounts', AccountRoute);
app.use('/api/transactions', TransactionRoute);
app.use('/api/transactionTypes', TransactionTypeRoute);

module.exports = app;