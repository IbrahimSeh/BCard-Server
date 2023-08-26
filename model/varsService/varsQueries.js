const config = require("config");
const varsServiceMongo = require("../mongodb/VAR/VARServices");
const dbOption = config.get("dbOption");
const createVAR = (carToSave) => {
    if (dbOption === "mongo") {
        return varsServiceMongo.createVehicleAdvertisingRequests(carToSave);
    }
};

const getAllVARs = () => {
    if (dbOption === "mongo") {
        return varsServiceMongo.getAllVARs();
    }
};

// const getCarById = (id) => {
//     if (dbOption === "mongo") {
//         return carsServiceMongo.getCarById(id);
//     }
// };

// const getUserCars = (userID) => {
//     if (dbOption === "mongo") {
//         return carsServiceMongo.getUserCars(userID);
//     }
// };

// const getCarByBizNumber = (bizNumber) => {
//     if (dbOption === "mongo") {
//         return carsServiceMongo.getCarByBizNumber(bizNumber);
//     }
// };

// const updateCar = (id, carToUpdate) => {
//     if (dbOption === "mongo") {
//         return carsServiceMongo.updateCar(id, carToUpdate);
//     }
// };

// const deleteCar = (id) => {
//     if (dbOption === "mongo") {
//         return carsServiceMongo.deleteCar(id);
//     }
// };

// const carToLike = (id) => {
//     if (dbOption === "mongo") {
//         return carsServiceMongo.deleteCar(id);
//     }
// };

module.exports = {
    createVAR,
    getAllVARs,
    // getCarById,
    // getUserCars,
    // getCarByBizNumber,
    // updateCar,
    // deleteCar,
    // carToLike,
};
