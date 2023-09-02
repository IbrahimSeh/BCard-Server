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

const getVARById = (id) => {
    if (dbOption === "mongo") {
        return varsServiceMongo.getVARById(id);
    }
};

const getUserFavVars = (userID) => {
    if (dbOption === "mongo") {
        return varsServiceMongo.getUserFavVars(userID);
    }
};

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

const getVARByFlag = (flag) => {
    if (dbOption === "mongo") {
        return varsServiceMongo.getVARByFlag(flag);
    }
};

const updateVAR = (id, VARToUpdate) => {
    if (dbOption === "mongo") {
        return varsServiceMongo.updateVAR(id, VARToUpdate);
    }
};

const deleteVAR = (id) => {
    if (dbOption === "mongo") {
        return varsServiceMongo.deleteVAR(id);
    }
};

// const carToLike = (id) => {
//     if (dbOption === "mongo") {
//         return carsServiceMongo.deleteCar(id);
//     }
// };

module.exports = {
    createVAR,
    getAllVARs,
    getVARById,
    updateVAR,
    getVARByFlag,
    getUserFavVars,
    // getUserCars,
    // getCarByBizNumber,
    deleteVAR,
    // carToLike,
};
