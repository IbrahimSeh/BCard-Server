const config = require("config");
const joiRegisterValidation = require("./joi/registerValidation");
const joiLoginValidation = require("./joi/loginValidation");
const joiEditValidation = require("./joi/EditValidation");
const joiPasswordValidation = require("./joi/passwordValidation");
const validatorOption = config.get("validatorOption");

const registerUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiRegisterValidation.validateRegisterSchema(userInput);
  }
  throw new Error("validator undefined");
};
const loginUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiLoginValidation.validateLoginSchema(userInput);
  }
  throw new Error("validator undefined");
};
const EditUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiEditValidation.validateEditSchema(userInput);
  }
  throw new Error("validator undefined");
};
const PasswordUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiPasswordValidation.validatePasswordSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  registerUserValidation,
  loginUserValidation,
  EditUserValidation,
  PasswordUserValidation,
};
