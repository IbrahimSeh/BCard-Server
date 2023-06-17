const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const cardQueriesModel = require("../../model/cardsService/cardsQueries");
const cardsValidationService = require("../../validation/cardsValidationService");
const normalizeCard = require("../../model/cardsService/helpers/normalizationCardService");

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
router.post("/", async (req, res) => {
    try {
        await cardsValidationService.createCardValidation(req.body);
        console.log('user id = ', jwt.decode(req.headers["x-auth-token"])._id);
        let normalCard = await normalizeCard(req.body, jwt.decode(req.headers["x-auth-token"])._id);
        const dataFromMongoose = await cardQueriesModel.createCard(normalCard);
        console.log("dataFromMongoose", dataFromMongoose);
        res.json({ msg: "ok" });
    } catch (error) {
        console.log(chalk.redBright(error.message));
        return res.status(500).send(error.message);
    }
});


module.exports = router;