const express = require("express");
const router = express.Router();
const userQueriesModel = require("../../model/usersService/usersQueries");
const cardQueriesModel = require("../../model/cardsService/cardsQueries");
const CustomError = require("../../utils/CustomError");
const isAdminMw = require("../../middleware/isAdminMW");
const tokenMw = require("../../middleware/verifyTokenMW");
const { isValidBizNumber } = require("../../utils/objectID/verifyObjectID");


//http://localhost:8181/api/admin/:id
router.put("/:id", tokenMw, isAdminMw, async (req, res) => {
    try {
        const cardFromDB = await cardQueriesModel.getCardById(req.params.id);
        if (!cardFromDB) throw new CustomError("Sorry ,card not found in database !");
        /* req.body.bizNumber = example >
        {
            "bizNumber": "100189"
        }
        */
        //check if any card have the new biz number that supply by user(req.body.bizNumber)
        const cardHaveNewBizNumber = await cardQueriesModel.getCardByBizNumber(req.body.bizNumber);
        if (cardHaveNewBizNumber) throw new CustomError("Sorry ,one of the cards contains this number");
        //validate the new bizNumber
        if (req.body.bizNumber < 1000000 || req.body.bizNumber > 9999999) throw new CustomError("bizNumber must be between 1000000 and 9999999");
        cardFromDB.bizNumber = req.body.bizNumber;
        const updatedCard = await cardQueriesModel.updateCard(
            req.params.id,
            cardFromDB
        );
        res.json(updatedCard);
    } catch (err) {
        if (err.hasOwnProperty('details')) {
            return res.status(400).send(err.details[0].message)
        }
        if (err.hasOwnProperty('keyValue')) {
            return res.status(400).send(err.keyValue.email + " is already exist in database");
        }
        res.status(400).json(err);
    }
});

module.exports = router;