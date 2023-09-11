const Joi = require("joi");

const passwordSchema = Joi.object({
    password: Joi.string()
        .regex(
            new RegExp(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            )
        )
        .min(8).max(1024).required(),
});

const validatePasswordSchema = (userInput) =>
    passwordSchema.validateAsync(userInput);

module.exports = {
    validatePasswordSchema,
};
