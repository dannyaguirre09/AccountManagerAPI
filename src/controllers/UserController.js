const { Op } = require("sequelize");
const User = require('../models/User');
const UserController = {};
const Validation = require('../util/Validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Function to create a user
UserController.createUser = async (req, res) => {
    var message = 'An ocurreded a problem when we tried to create a user';
    var status = 500;
    var data = {};
    try {
        const  {error } = Validation.RegisterValidation(req.body);
        if( !error ) { 
            const { userName, userLastName, userEmail, userUserName, userPassword } = req.body;  
            const emailExist = await User.findOne({where: {[Op.or]: [ {userEmail}, {userUserName} ] } } );
            if(!emailExist) {                
                const newUser = await User.create({ userName, userLastName, userEmail, userUserName, userPassword}); 
                if (newUser) {
                    message = 'The User has been created successfully';
                    data = { userName, userLastName, userEmail, userUserName };
                    status = 200;
                }
            } else 
                message= message + ':  Email or Username already exists in our records';  
        } else 
            message =  message + ': ' + error.details[0].message;
    } catch (err) {
       res.status(status).json({status:status, message: message + ' : ' +  err, data: data});
    }
    res.status(status).json({ status: status, message: message, data: data })
};

//Function to loggin users
UserController.authenticationUser = async(req, res) => {
    var message = 'An ocurreded a problem when we tried to login a user';
    var status = 500;
    var data = {};
    try {
        const { error } = Validation.LoginValidation(req.body);
        if( !error ) {
            const { userUserName, userPassword } = req.body;
            const userExist = await User.findOne({ where: {  userUserName }});
            if( userExist) {
                const validPassword = await bcrypt.compare(userPassword, userExist.userPassword);
                if( validPassword ) {
                    message = 'The user was authenticated successfully';
                    data = jwt.sign({userId: userExist.userId}, 'S3CR3T4U73N71C4710N');                    
                    status = 200;
                    res.header('auth-token')
                } else {
                    message = message + ': Invalid Password' ;
                    status = 404;
                }
            } else {
                message = message + ': The username was not found in our records' ; 
                status = 404;
            }
        } else 
            message = message + ': ' + error.details[0].message;
    } catch (err) {
        message = message + ': ' + err;
    }
    res.status(status).json( { status, message, data } )
};

//Function to get information about a user
UserController.getUserById = async(req, res) => {
    var message = 'An ocurreded a problem when we tried to get a user: ';
    var status = 500;
    var data = {};
    try {
        const { userId } = req.params;
        const user = await User.findOne({ where: { userId, status: true } }); 
        if(user) {
            message = 'User was found successfully';
            status = 200;
            data = { userId: user.userId, userName: user.userName, userLastName: user.userLastName,
                            userEmail: user.userEmail,  userUserName: user.userUserName };
        } else {
            message = message + 'User was not found in our records';
            status = 404;
        }
    } catch( err ) {
        message = message + err;
    }
    res.status(status).json({ status, message, data });
}

module.exports = UserController;