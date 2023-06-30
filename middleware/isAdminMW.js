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
    res.status(500).json(err.msg);
  }
};

module.exports = isAdminMw;
