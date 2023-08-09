const config = require("config");
const carsServiceMongo = require("../mongodb/cars/carsService");
const dbOption = config.get("dbOption");
const createCar = (carToSave) => {
  if (dbOption === "mongo") {
    return carsServiceMongo.createCar(carToSave);
  }
};

//used
const getAllCars = () => {
  if (dbOption === "mongo") {
    return carsServiceMongo.getAllCars();
  }
};

const getCarById = (id) => {
  if (dbOption === "mongo") {
    return carsServiceMongo.getCarById(id);
  }
};

const getUserCars = (userID) => {
  if (dbOption === "mongo") {
    return carsServiceMongo.getUserCars(userID);
  }
};

const getCarByBizNumber = (bizNumber) => {
  if (dbOption === "mongo") {
    return carsServiceMongo.getCarByBizNumber(bizNumber);
  }
};

const updateCar = (id, carToUpdate) => {
  if (dbOption === "mongo") {
    return carsServiceMongo.updateCar(id, carToUpdate);
  }
};

const deleteCar = (id) => {
  if (dbOption === "mongo") {
    return carsServiceMongo.deleteCar(id);
  }
};

const carToLike = (id) => {
  if (dbOption === "mongo") {
    return carsServiceMongo.deleteCar(id);
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  getUserCars,
  getCarByBizNumber,
  updateCar,
  deleteCar,
  carToLike,
};
