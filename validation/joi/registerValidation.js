const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.object()
    .keys({
      first: Joi.string().min(2).max(256).required(),
      middle: Joi.string().min(2).max(256).allow(""),
      last: Joi.string().min(2).max(256).required(),
    })
    .required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .min(9).max(14).required(),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .min(6).max(256).required(),
  password: Joi.string()
    .regex(
      new RegExp(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    )
    .min(8).max(1024).required(),
  image: Joi.object().keys({
    url: Joi.string()
    // .regex(
    //   new RegExp(
    //     /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    //   )
    // )
    ,
    alt: Joi.string().min(2).max(256),
  }),
  address: Joi.object()
    .keys({
      state: Joi.string().min(2).max(256).allow(""),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.string().min(1).max(256).required(),
      zip: Joi.number().allow("", 0),
    })
    .required(),
  isSubscription: Joi.boolean(),
});

const validateRegisterSchema = (userInput) =>
  registerSchema.validateAsync(userInput);

module.exports = {
  validateRegisterSchema,
};
