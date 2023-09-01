const VAR = require("./VehicleAdvertisingRequests"); // VAR = VehicleAdvertisingRequests

const createVehicleAdvertisingRequests = (carToSave) => {
    let VehicleAdvertisingRequests = new VAR(carToSave);
    return VehicleAdvertisingRequests.save();
};

const getAllVARs = () => {
    return VAR.find();
};

const getVARById = (id) => {
    return VAR.findById(id);
};

// const getUserCars = (userID) => {
//     return Car.find({ user_id: userID });
// };

const getVARByFlag = (flag) => {
    return VAR.find({ toPublish: flag });
};

// const getCarByBizNumber = (bizNumber) => {
//     return Car.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
// };

const updateVAR = (id, VARToUpdate) => {
    return VAR.findByIdAndUpdate(id, VARToUpdate, {
        new: true,
    });
};

const deleteVAR = (id) => {
    return VAR.findByIdAndDelete(id);
};

module.exports = {
    createVehicleAdvertisingRequests,
    getAllVARs,
    getVARById,
    updateVAR,
    getVARByFlag,
    // getUserCars,
    // getCarByBizNumber,
    deleteVAR,
};