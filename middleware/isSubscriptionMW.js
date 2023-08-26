const CustomError = require("../utils/CustomError");

const isSubscriptionMw = async (req, res, next) => {
    try {
        if (!req.userData.isSubscription)
            throw new CustomError("user must be Subscription !")
        next();
    } catch (err) {
        res.status(401).json(err);
    }
};
module.exports = isSubscriptionMw;
