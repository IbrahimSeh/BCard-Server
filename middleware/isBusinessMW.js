const { verifyToken } = require("../utils/token/tokenService");
const CustomError = require("../utils/CustomError");

const isBizMw = async (req, res, next) => {
    try {
        //console.log('isBiz ,req.userData = ', req.userData);
        if (!req.userData.isBusiness)
            throw new CustomError("user must be Business !")
        next();
    } catch (err) {
        let errToSend;
        if (err instanceof CustomError) {
            errToSend = err;
        } else {
            errToSend = new CustomError("invalid token");
        }
        res.status(401).json(errToSend);
    }
};
module.exports = isBizMw;
