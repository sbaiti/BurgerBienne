const Joi = require("joi");

function validateUser(user) {
    const schema = {
        Name: Joi.string()
            .max(50)
            .required(),
        Email: Joi.string()
            .min(6)
            .max(50)
            .required()
            .email(),
        Password: Joi.string()
            .min(5)
            .max(1024)
            .required(),
        Login: Joi.string()
            .min(3)
            .max(50)
            .required(),
        Role: Joi.string()
            .min(3)
            .max(50)
            .required(),
        id: Joi.string()
            .min(24)
            .max(24)
    };

    return Joi.validate(user, schema);
}
exports.validate = validateUser;
