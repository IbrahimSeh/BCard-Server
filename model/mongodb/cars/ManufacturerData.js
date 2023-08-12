const mongoose = require("mongoose");
const {
    DEFAULT_STRING_SCHEMA,
    DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const ManufacturerData = new mongoose.Schema({
    manufacturer: DEFAULT_STRING_SCHEMA_REQUIRED,
    type: DEFAULT_STRING_SCHEMA_REQUIRED,
    subType: DEFAULT_STRING_SCHEMA,
});

module.exports = ManufacturerData;
