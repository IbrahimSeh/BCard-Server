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
  console.log('manuf = ', ...searchData.manufacturerArr);
  return Car.find({
    "manufacturerData.manufacturer": searchData.manufacturerArr[0],
    yearOfProduction: { $gte: searchData.fromYear, $lte: searchData.toYear },
    kilometers: { $gte: searchData.FromKm, $lte: searchData.toKm },
    previousOwners: { $gte: searchData.fromPrvOwn, $lte: searchData.toPrvOwn },
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
