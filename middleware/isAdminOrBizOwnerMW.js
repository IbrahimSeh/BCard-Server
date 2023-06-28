const CustomError = require("../utils/CustomError");
const { getCardById } = require("../model/cardsService/cardsQueries");
const { isValidObjectId } = require("../utils/objectID/verifyObjectID");

const checkIfBizOwner = async (iduser, idcard, res, next) => {
    try {
        const validateID = isValidObjectId(idcard);
        if (!validateID) throw new CustomError("object-id is not a valid MongodbID");
        const cardData = await getCardById(idcard);
        if (!cardData) {
            return res.status(404).json({ msg: "card does not exist in database" });
        }
        if (cardData.user_id == iduser) {
            next();
        } else {
            res.status(401).json({ msg: "business user : you not the business owner of this card" });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

const isAdminOrOwnerMw = (isBiz, isAdmin, isBizOwner) => {
    return (req, res, next) => {
        if (!req.userData) {
            throw new CustomError("must provide userData");
        }
        if (isBiz === req.userData.isBusiness && isBiz === true) {
            return next();
        }
        if (isAdmin === req.userData.isAdmin && isAdmin === true) {
            console.log('in if admin');
            return next();
        }
        if (isBizOwner === req.userData.isBusiness && isBizOwner === true) {
            return checkIfBizOwner(req.userData._id, req.params.id, res, next);
        }
        res.status(401).json({ msg: "you not allowed to delete this card" });
    };
};

module.exports = isAdminOrOwnerMw;
