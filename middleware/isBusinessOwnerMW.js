const { getCardById } = require("../model/cardsService/cardsQueries");

const businessOwnerMw = async (iduser, idcard, res, next) => {
    try {
        //! joi the idcard
        const cardData = await getCardById(idcard);
        if (!cardData) {
            return res.status(400).json({ msg: "card not found" });
        }
        if (cardData.user_id == iduser) {
            next();
        } else {
            res.status(401).json({ msg: "you not the biz owner" });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = businessOwnerMw;