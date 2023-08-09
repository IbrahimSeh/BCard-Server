const config = require("config");
const joiCarsValidation = require("./joi/carsValidation");

const validatorOption = config.get("validatorOption");

const createCarValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiCarsValidation.validateCarSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  createCarValidation,
};
