const { getCardById } = require("../model/cardsService/cardsQueries");
const { isValidObjectId } = require("../utils/objectID/verifyObjectID");
const CustomError = require("../utils/CustomError");

const isBusinessOwnerMW = async (req, res, next) => {
    try {
        const validateID = isValidObjectId(req.params.id);
        if (!validateID) throw new CustomError("object-id is not a valid MongodbID");
        const cardData = await getCardById(req.params.id);
        if (!cardData) {
            return res.status(404).json({ msg: "card does not exist in database" });
        }
        if (cardData.user_id == req.userData._id) {
            next();
        } else {
            res.status(401).json({ msg: "you not the biz owner" });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = isBusinessOwnerMW;