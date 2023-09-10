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

const getCarByManufacturer = (stringCarArr) => {
  return Car.find({ "manufacturerData.manufacturer": stringCarArr });
}

const getSearchCars = (searchData) => {
  let queryRes = [];
  for (const [index, carName] of searchData.manufacturerArr.entries()) {
    queryRes[index] = getCarByManufacturer(carName);
  }
  //console.log('queryRes = ', queryRes);
  let x = Car.find({
    $or: [{ "manufacturerData.manufacturer": searchData.manufacturerArr[0] }, { "manufacturerData.manufacturer": searchData.manufacturerArr[1] },],
  });

  let y;
  for (let index = 0; index < queryRes.length; index++) {
    y = queryRes[index].find({
      yearOfProduction: { $gte: searchData.fromYear, $lte: searchData.toYear },
      kilometers: { $gte: searchData.FromKm, $lte: searchData.toKm },
      previousOwners: { $gte: searchData.fromPrvOwn, $lte: searchData.toPrvOwn },
    });
  }

  //console.log('y = ', y);
  return y;
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
