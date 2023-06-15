const config = require("config");
const mongoose = require("mongoose");

console.log("(model 1 mongo data base)connecting to DB at ", config.get("dbConfig.url"));

const connectToDB = () => {
  return mongoose.connect(config.get("dbConfig.url"));
};

module.exports = connectToDB;
