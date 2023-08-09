const config = require("config");
const normalizationCarMongo = require("../../mongodb/cars/helpers/normalizationCar");
const dbOption = config.get("dbOption");

const normalizeCarService = (car, userId) => {
  if (dbOption === "mongo") {
    return normalizationCarMongo(car, userId);
  }
};

module.exports = normalizeCarService;
