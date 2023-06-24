const CustomError = require("../utils/CustomError");
const { isValidObjectId } = require("../utils/objectID/verifyObjectID");

const checkIfRegistered = async (iduserData, iduserParams, res, next) => {
    try {
        if (iduserData == iduserParams) {
            next();
        } else {
            res.status(401).json({ msg: "you not the registered user" });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

const isAdminOrRegisteredMw = (isAdmin, isRegistered) => {
    return (req, res, next) => {
        if (!req.userData) {
            throw new CustomError("must provide userData");
        }
        const validateID = isValidObjectId(req.params.id);
        if (!validateID) {
            throw new CustomError("id is not a valid MongodbID");
        }
        if (isAdmin === req.userData.isAdmin && isAdmin === true) {
            return next();
        }
        if (isRegistered === true) {
            return checkIfRegistered(req.userData._id, req.params.id, res, next);
        }
        res.status(401).json({ msg: "you not allowed to get data about this user" });
    };
};

module.exports = isAdminOrRegisteredMw;
