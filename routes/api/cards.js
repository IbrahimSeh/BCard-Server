const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const cardQueriesModel = require("../../model/cardsService/cardsQueries");
const cardsValidationService = require("../../validation/cardsValidationService");
const CustomError = require("../../utils/CustomError");
const normalizeCard = require("../../model/cardsService/helpers/normalizationCardService");
const isBusinessMW = require("../../middleware/isBusinessMW");
const isBusinessOwnerMW = require("../../middleware/isBusinessOwnerMW");
const tokenMw = require("../../middleware/verifyTokenMW");
const isAdminOrBizOwnerMW = require("../../middleware/isAdminOrBizOwnerMW");
const { isValidObjectId } = require("../../utils/objectID/verifyObjectID");

//http://localhost:8181/api/cards
router.get("/", async (req, res) => {
    try {
        const allCards = await cardQueriesModel.getAllCards();
        res.json(allCards);
    } catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cards/my-cards
router.get("/my-cards", tokenMw, async (req, res) => {
    try {
        /*
        I guess you don't need to check if the user is a business because it is possible that he was a business and became normal,by (PATCH) http://localhost:8181/api/users/:id
        */
        const userCards = await cardQueriesModel.getUserCards(req.userData._id);
        return res.send(userCards);
    } catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cards/:id
router.get("/:id", async (req, res) => {
    try {
        const validateID = isValidObjectId(req.params.id);
        if (!validateID) throw new CustomError("object-id is not a valid MongodbID");
        const cardFromDB = await cardQueriesModel.getCardById(req.params.id);
        if (!cardFromDB) throw new CustomError("Sorry ,card not found in database !");
        res.json(cardFromDB);
    } catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cards
router.post("/", tokenMw, isBusinessMW, async (req, res) => {
    try {
        await cardsValidationService.createCardValidation(req.body);
        let normalCard = await normalizeCard(req.body, jwt.decode(req.headers["x-auth-token"])._id);
        const dataFromMongoose = await cardQueriesModel.createCard(normalCard);
        res.json(dataFromMongoose);
    } catch (err) {
        if (err.hasOwnProperty('details')) {
            return res.status(400).send(err.details[0].message)
        }
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cards/:id
router.put("/:id", tokenMw, isBusinessOwnerMW, async (req, res) => {
    try {
        //joi the id card in isBusinessOwnerMW
        await cardsValidationService.createCardValidation(req.body);
        let normalCard = await normalizeCard(req.body, jwt.decode(req.headers["x-auth-token"])._id);
        const cardFromDB = await cardQueriesModel.getCardById(req.params.id);
        if (!cardFromDB) throw new CustomError("Sorry ,card not found in database !");
        const updatedCard = await cardQueriesModel.updateCard(
            req.params.id,
            normalCard
        );
        res.json(updatedCard);
    } catch (err) {
        if (err.hasOwnProperty('details')) {
            return res.status(400).send(err.details[0].message)
        }
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cards/:id
router.patch("/:id", tokenMw, async (req, res) => {
    try {
        const validateID = isValidObjectId(req.params.id);
        if (!validateID) throw new CustomError("object-id is not a valid MongodbID");
        let cardFromDB = await cardQueriesModel.getCardById(req.params.id);
        if (!cardFromDB) throw new CustomError("Sorry ,card not found in database !");
        const userID = jwt.decode(req.headers["x-auth-token"])._id
        //update like array
        if (cardFromDB.likes.includes(userID)) {
            //remove userID
            const index = cardFromDB.likes.indexOf(userID);
            if (index > -1) { // only splice array when item is found
                cardFromDB.likes.splice(index, 1);
            }
        } else {
            //add it
            cardFromDB.likes.push(userID);
        }
        const updatedCard = await cardQueriesModel.updateCard(
            req.params.id,
            cardFromDB
        );
        res.json(updatedCard);

    } catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cards/:id
router.delete("/:id", tokenMw, isAdminOrBizOwnerMW(false, true, true), async (req, res) => {
    try {
        //joi the id card in isAdminOrBizOwnerMW
        const deletedCard = await cardQueriesModel.deleteCard(req.params.id);
        if (!deletedCard) throw new CustomError("Sorry ,card not found in database !");
        res.json(deletedCard);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;