const usersService = require("../model/usersService/usersQueries");
const carsService = require("../model/carsService/carsQueries");
const VARsService = require("../model/varsService/varsQueries");
const hashService = require("../utils/hash/hashService");
const normalizeUser = require("../model/usersService/helpers/normalizationUserService");
const normalizeCar = require("../model/carsService/helpers/normalizationCarService");

const usersData = require("./users.json");
const carsData = require("./cars.json");
const VARsData = require("./VARs.json");

const initialData = async () => {
  try {
    let cars = await carsService.getAllCars();
    if (cars.length) {
      return;
    }
    let users = await usersService.getAllUsers();
    if (users.length) {
      return;
    }
    let VARs = await VARsService.getAllVARs();
    if (VARs.length) {
      return;
    }
    let user_id = "";
    for (let user of usersData) {
      user.password = await hashService.generateHash(user.password);
      user = normalizeUser(user);
      user_id = await usersService.registerUser(user);
    }
    user_id = user_id._id + "";
    for (let car of carsData) {
      car = await normalizeCar(car, user_id);
      await carsService.createCar(car);
    }
    for (let VAR of VARsData) {
      VAR = await normalizeCar(VAR, user_id);
      await VARsService.createVAR(VAR);
    }
  } catch (err) {
    console.log("err from initial", err);
  }
};

module.exports = initialData;
