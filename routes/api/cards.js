const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const cardQueriesModel = require("../../model/cardsService/cardsQueries");
const cardsValidationService = require("../../validation/cardsValidationService");
const normalizeCard = require("../../model/cardsService/helpers/normalizationCardService");
const tokenMw = require("../../middleware/verifyTokenMW");
const isBizMw = require("../../middleware/isBusinessMW");
const Card = require("../../model/mongodb/cards/Card");
const generateBizNum = require("../../model/mongodb/cards/helpers/generateBizNumber");

//http://localhost:8181/api/cards
router.get("/", async (req, res) => {
    try {
        const allCards = await cardQueriesModel.getAllCards();
        res.json(allCards);
    } catch (error) {
        console.log(chalk.redBright(error.message));
        return res.status(500).send(error.message);
    }
});

//http://localhost:8181/api/cards/my-cards
router.get("/my-cards", async (req, res) => {
    try {
        let user = jwt.decode(req.headers["x-auth-token"]);
        if (!user.isBusiness) return res.status(403).json("Un authorize user!");
        const userCards = await cardQueriesModel.getUserCards(user._id);
        return res.send(userCards);
    } catch (error) {
        console.log(chalk.redBright(error.message));
        return res.status(500).send(error.message);
    }
});

//http://localhost:8181/api/cards/:id
router.get("/:id", async (req, res) => {
    try {
        //! joi validation objectid?
        const cardFromDB = await cardQueriesModel.getCardById(req.params.id);
        res.json(cardFromDB);
    } catch (error) {
        console.log(chalk.redBright(error.message));
        return res.status(500).send(error.message);
    }
});

//http://localhost:8181/api/cards
router.post("/", tokenMw, isBizMw, async (req, res) => {
    try {
        await cardsValidationService.createCardValidation(req.body);
        let normalCard = await normalizeCard(req.body, jwt.decode(req.headers["x-auth-token"])._id);
        const dataFromMongoose = await cardQueriesModel.createCard(normalCard);
        res.json(dataFromMongoose);
    } catch (error) {
        console.log(chalk.redBright(error.message));
        return res.status(500).send(error.message);
    }
});

//http://localhost:8181/api/cards/:id
router.put("/:id", async (req, res) => {
    try {
        await cardsValidationService.createCardValidation(req.body);
        let normalCard = await normalizeCard(req.body, jwt.decode(req.headers["x-auth-token"])._id);
        const cardFromDB = await cardQueriesModel.getCardById(req.params.id);
        if (!cardFromDB) {
            console.log(
                chalk.redBright("card does not exist in database")
            );
            return res.status(404).json("card does not exist in database");
        }
        const updatedCard = await cardQueriesModel.updateCard(
            req.params.id,
            normalCard
        );
        res.json(updatedCard);
    } catch (error) {
        console.log(chalk.redBright(error.message));
        return res.status(500).send(error.message);
    }
});

//http://localhost:8181/api/cards/:id
router.patch("/:id", async (req, res) => {
    try {
        let cardFromDB = await cardQueriesModel.getCardById(req.params.id);
        if (!cardFromDB) {
            console.log(
                chalk.redBright("card does not exist in database")
            );
            return res.status(404).json("card does not exist in database");
        }
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

    } catch (error) {
        console.log(chalk.redBright("Could not edit like:", error.message));
        return res.status(500).send(error.message);
    }
});

//http://localhost:8181/api/cards/:id
router.delete("/:id", async (req, res) => {
    try {
        const cardFromDB = await cardQueriesModel.deleteCard(req.params.id);
        if (cardFromDB) {
            res.json({ msg: "deleted card" });
        } else {
            res.json({ msg: "could not find the card" });
        }
    } catch (error) {
        console.log(chalk.redBright("Could not delete card:", error.message));
        return res.status(500).send(error.message);
    }
});

module.exports = router;