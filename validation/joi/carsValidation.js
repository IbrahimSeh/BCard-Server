const Joi = require("joi");

const createCarSchema = Joi.object({
  manufacturerData: Joi.object().keys({
    manufacturer: Joi.string().min(2).max(256).required(),
    type: Joi.string().min(2).max(256).required(),
    subType: Joi.string().max(256).allow(""),
  }),
  yearOfProduction: Joi.number().min(2).max(3000).required(),
  previousOwners: Joi.number().max(3000).required(),
  kilometers: Joi.number().max(2000000).allow(""),
  engine: Joi.object().keys({
    engineType: Joi.string().max(256).allow(""),
    fuelType: Joi.string().required(),
  }),
  communications: Joi.object().keys({
    phone: Joi.string()
      .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
      .required(),
    email: Joi.string()
      .regex(
        new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
      ).allow(""),
  }),
  image: Joi.object().keys({
    url: Joi.string(),
    alt: Joi.string().min(2).max(256),
  }),
  address: Joi.object().keys({
    state: Joi.string().min(2).max(256).allow(''),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
  }),
  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  user_id: Joi.string().hex().length(24),
});

const validateCarSchema = (userInput) => {
  return createCarSchema.validateAsync(userInput);
};

module.exports = {
  validateCarSchema,
};
