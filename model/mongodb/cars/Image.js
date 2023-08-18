const mongoose = require("mongoose");
const {
  URL,
  DEFAULT_STRING_SCHEMA,
} = require("./helpers/mongooseValidation");

const Image = new mongoose.Schema({
  // url: URL,
  // alt: DEFAULT_STRING_SCHEMA,
  url: [String],
  alt: [String],
});

module.exports = Image;
