const User = require('../models/User');
const Q = require("q");
const Bcrypt = require("bcryptjs");
const Salt = Bcrypt.genSaltSync(10);
const config = require('../config/environnement.json');
const jwt = require("jsonwebtoken");


const UserServices = {};
UserServices.register = register;
UserServices.login = login;
UserServices.generateToken = generateToken;

function register(userObj) {
    console.log('userObj----------', userObj);
    newUser = new User({
        Name: userObj.Name,
        Password: Bcrypt.hashSync(userObj.Password, Salt),
        Email: userObj.Email,
        Role: userObj.Role,
        Login: userObj.Login
    });
    var deferred = Q.defer();
    User.findOne({ Email: userObj.Email.toString().toLowerCase() }, (err, user) => {
        if (err) deferred.reject(err);
        else if (user) deferred.reject("user already exist");
        else {
            newUser.save((err, userObject) => {
                if (err) deferred.reject(err);
                else deferred.resolve(userObject);
            });
        }
    }
    );
    return deferred.promise;
}

function login(userLogin) {
    var deferred = Q.defer();
    User.findOne({ Email: userLogin.Email }, async (err, user) => {
        if (err) deferred.reject(err);
        else if (!user) deferred.reject("Invalid email or password.");
        else {
            const validPassword = await Bcrypt.compare(
                userLogin.Password,
                user.Password
            );
            if (!validPassword) return deferred.reject("Invalid email or password.");
            else deferred.resolve(user);
        }
    });
    return deferred.promise;
}

function generateToken(user) {
    var deferred = Q.defer();
    const payload = {
        _id: user._id,
        Login: user.Login,
        Name: user.Name,
        Email: user.Email,
        Role: user.Role
    };
    jwt.sign(
        payload,
        config.sekretCode,
        { expiresIn: 36000 },
        (err, token) => {
            if (err) deferred.reject(err);
            else {
                deferred.resolve(token);
                console.log({ token });
            }
        }
    );
    return deferred.promise;
}

module.exports = UserServices;