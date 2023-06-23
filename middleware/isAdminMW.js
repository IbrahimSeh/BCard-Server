const CustomError = require("../utils/CustomError");
const isAdminMw = async (req, res, next) => {
  try {
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }
    if (!req.userData.isAdmin)
      throw new CustomError("user must be Admin !")
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

module.exports = isAdminMw;
