const CustomError = require("../utils/CustomError");
const { getCarById } = require("../model/carsService/carsQueries");
const { isValidObjectId } = require("../utils/objectID/verifyObjectID");

const checkIfIsSubscriptionOwnerMW = async (iduser, idcar, res, next) => {
    try {
        const validateID = isValidObjectId(idcar);
        if (!validateID) throw new CustomError("object-id is not a valid MongodbID");
        const carData = await getCarById(idcar);
        if (!carData) {
            return res.status(404).json({ msg: "car does not exist in database" });
        }
        if (carData.user_id == iduser) {
            next();
        } else {
            res.status(401).json({ msg: "business user : you not the business owner of this car" });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

const isAdminOrisSubscriptionOwnerMw = (isSubscription, isAdmin, isisSubscriptionOwner) => {
    return (req, res, next) => {
        if (!req.userData) {
            throw new CustomError("must provide userData");
        }
        if (isSubscription === req.userData.isSubscription && isSubscription === true) {
            return next();
        }
        if (isAdmin === req.userData.isAdmin && isAdmin === true) {
            console.log('in if admin');
            return next();
        }
        if (isisSubscriptionOwner === req.userData.isSubscription && isisSubscriptionOwner === true) {
            return checkIfIsSubscriptionOwnerMW(req.userData._id, req.params.id, res, next);
        }
        res.status(401).json({ msg: "you not allowed to delete this car" });
    };
};

module.exports = isAdminOrisSubscriptionOwnerMw;
