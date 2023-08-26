const mongoose = require("mongoose");
const Image = require("../cars/Image");
const Address = require("../cars/Address");
const ManufacturerData = require("../cars/ManufacturerData");
const Communications = require("../cars/Communications");
const Engine = require("../cars/Engine");
const {
    DEFAULT_NUMBER_SCHEMA, DEFAULT_NUMBER_SCHEMA_REQUIRED
} = require("../cars/helpers/mongooseValidation");

const VARSchema = new mongoose.Schema({
    manufacturerData: ManufacturerData,
    communications: Communications,
    engine: Engine,
    yearOfProduction: { ...DEFAULT_NUMBER_SCHEMA_REQUIRED },
    previousOwners: { ...DEFAULT_NUMBER_SCHEMA_REQUIRED },
    kilometers: { ...DEFAULT_NUMBER_SCHEMA },
    image: Image,
    address: Address,
    bizNumber: {
        type: Number,
        minLength: 7,
        maxLength: 7,
        required: true,
        trim: true,
    },
    toPublish: { type: Boolean, default: false },
    likes: [String],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const VAR = mongoose.model("VehicleAdvertisingRequests", VARSchema); // VAR = VehicleAdvertisingRequests
module.exports = VAR;
