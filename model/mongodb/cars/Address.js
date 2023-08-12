const mongoose = require("mongoose");
const {
  DEFAULT_STRING_SCHEMA,
  DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const Address = new mongoose.Schema({
  state: DEFAULT_STRING_SCHEMA,
  country: DEFAULT_STRING_SCHEMA_REQUIRED,
  city: DEFAULT_STRING_SCHEMA_REQUIRED,
  street: DEFAULT_STRING_SCHEMA_REQUIRED,
});

module.exports = Address;
