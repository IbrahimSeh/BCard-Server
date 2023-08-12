const mongoose = require("mongoose");
const {
    DEFAULT_STRING_SCHEMA,
    DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const Engine = new mongoose.Schema({
    engineType: DEFAULT_STRING_SCHEMA,
    fuelType: DEFAULT_STRING_SCHEMA_REQUIRED
});

module.exports = Engine;
