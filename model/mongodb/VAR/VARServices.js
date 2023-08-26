const VAR = require("./VehicleAdvertisingRequests"); // VAR = VehicleAdvertisingRequests

const createVehicleAdvertisingRequests = (carToSave) => {
    let VehicleAdvertisingRequests = new VAR(carToSave);
    return VehicleAdvertisingRequests.save();
};

const getAllVARs = () => {
    return VAR.find();
};

// const getCarById = (id) => {
//     return Car.findById(id);
// };

// const getUserCars = (userID) => {
//     return Car.find({ user_id: userID });
// };

// const getCarByBizNumber = (bizNumber) => {
//     return Car.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
// };

// const updateCar = (id, carToUpdate) => {
//     return Car.findByIdAndUpdate(id, carToUpdate, {
//         new: true,
//     });
// };

// const deleteCar = (id) => {
//     return Car.findByIdAndDelete(id);
// };

module.exports = {
    createVehicleAdvertisingRequests,
    getAllVARs,
    // getCarById,
    // getUserCars,
    // getCarByBizNumber,
    // updateCar,
    // deleteCar,
};
