const CustomError = require("../utils/CustomError");

const isBizMw = async (req, res, next) => {
    try {
        //console.log('isBiz ,req.userData = ', req.userData);
        if (!req.userData.isBusiness)
            throw new CustomError("user must be Business !")
        next();
    } catch (err) {
        res.status(401).json(err);
    }
};
module.exports = isBizMw;
