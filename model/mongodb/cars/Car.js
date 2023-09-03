const mongoose = require("mongoose");
const Image = require("./Image");
const Address = require("./Address");
const ManufacturerData = require("./ManufacturerData");
const Communications = require("./Communications");
const Engine = require("./Engine");
const {
  DEFAULT_NUMBER_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const carSchema = new mongoose.Schema({
  manufacturerData: ManufacturerData,
  communications: Communications,
  engine: Engine,
  yearOfProduction: { ...DEFAULT_NUMBER_SCHEMA_REQUIRED },
  previousOwners: { ...DEFAULT_NUMBER_SCHEMA_REQUIRED },
  kilometers: { ...DEFAULT_NUMBER_SCHEMA_REQUIRED },
  image: Image,
  address: Address,
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
    trim: true,
  },
  likes: [String],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Car = mongoose.model("cars", carSchema);
module.exports = Car;
