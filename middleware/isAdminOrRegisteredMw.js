const CustomError = require("../utils/CustomError");

const checkIfRegisteredUser = async (iduserData, iduserParams, res, next) => {
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
        try {
            if (!req.userData) {
                throw new CustomError("must provide userData");
            }
            if (isAdmin === req.userData.isAdmin && isAdmin === true) {
                return next();
            }
            if (isRegistered === true) {
                return checkIfRegisteredUser(req.userData._id, req.params.id, res, next);
            }
            res.status(401).json({ msg: "you not allowed to get data about this user" });
        } catch (err) {
            res.status(400).json(err.msg);
        }

    };
};

module.exports = isAdminOrRegisteredMw;
