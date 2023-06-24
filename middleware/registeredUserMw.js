const CustomError = require("../utils/CustomError");

const registeredUserMw = async (req, res, next) => {
    try {
        if (req.userData._id == req.params.id) {
            next();
        } else {
            res.status(401).json({ msg: "you not the registered user" });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};
module.exports = registeredUserMw;
