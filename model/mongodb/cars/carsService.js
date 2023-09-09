const Car = require("./Car");

const createCar = (carToSave) => {
  let car = new Car(carToSave);
  return car.save();
};

const getAllCars = () => {
  return Car.find();
};

const getCarById = (id) => {
  return Car.findById(id);
};

const getUserCars = (userID) => {
  return Car.find({ user_id: userID });
};

const getUserFavCars = (userID) => {
  return Car.find({ likes: userID });
};

const getCarByBizNumber = (bizNumber) => {
  return Car.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};

const getSearchCars = (searchData) => {
  return Car.find({
    yearOfProduction
      : searchData.fromYear,
    kilometers: searchData.FromKm
  });
}

const updateCar = (id, carToUpdate) => {
  return Car.findByIdAndUpdate(id, carToUpdate, {
    new: true,
  });
};

const deleteCar = (id) => {
  return Car.findByIdAndDelete(id);
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  getUserCars,
  getUserFavCars,
  getCarByBizNumber,
  getSearchCars,
  updateCar,
  deleteCar,
};
