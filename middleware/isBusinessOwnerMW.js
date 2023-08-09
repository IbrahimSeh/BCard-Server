const { getCarById } = require("../model/carsService/carsQueries");
const { isValidObjectId } = require("../utils/objectID/verifyObjectID");
const CustomError = require("../utils/CustomError");

const isBusinessOwnerMW = async (req, res, next) => {
    try {
        const validateID = isValidObjectId(req.params.id);
        if (!validateID) throw new CustomError("object-id is not a valid MongodbID");
        const carData = await getCarById(req.params.id);
        if (!carData) {
            return res.status(404).json({ msg: "car does not exist in database" });
        }
        if (carData.user_id == req.userData._id) {
            next();
        } else {
            res.status(401).json({ msg: "you not the biz owner" });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = isBusinessOwnerMW;