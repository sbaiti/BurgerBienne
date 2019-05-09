const express = require("express"),
    Router = express.Router(),
    userServices = require("../services/userServices"),
    { validate } = require("../validators/user"),
    // passport = require("passport"),
    Joi = require("joi");

//passport.authenticate("jwt", { session: false })

Router.post(
    "/addUser",
    (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        userServices
            .register(req.body)
            .then(userObject =>
                res
                    .status(201)
                    .json({ user: userObject, msg: "user added with success" })
            )
            .catch(err => {
                res.status(400).json({ err });
            });
    }
);

Router.post("/login", (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    userServices
        .login(req.body)
        .then(user =>
            userServices.generateToken(user).then(userObject => {
                res.status(201).json({
                    token: userObject,
                    msg: "success"
                });
            })
            )
            .catch(err => {
            res.status(400).json({ err });
        });
});

function validateLogin(req) {
    const schema = {
        Email: Joi.string()
            .min(6)
            .max(50)
            .required()
            .email(),
        Password: Joi.string()
            .min(5)
            .max(255)
            .required()
    };

    return Joi.validate(req, schema);
}
module.exports = Router;  