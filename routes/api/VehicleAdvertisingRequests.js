const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const carsValidationService = require("../../validation/carsValidationService");
const varQueriesModel = require("../../model/varsService/varsQueries");
const normalizeCar = require("../../model/carsService/helpers/normalizationCarService");
const isSubscriptionMw = require("../../middleware/isSubscriptionMW");
const tokenMw = require("../../middleware/verifyTokenMW");

//http://localhost:8181/api/VAR
router.post("/", tokenMw, isSubscriptionMw, async (req, res) => {
    try {
        await carsValidationService.createCarValidation(req.body);
        let normalCar = await normalizeCar(req.body, jwt.decode(req.headers["x-auth-token"])._id);
        const dataFromMongoose = await varQueriesModel.createVAR(normalCar);
        res.json(dataFromMongoose);
    } catch (err) {
        if (err.hasOwnProperty('details')) {
            return res.status(400).send(err.details[0].message)
        }
        res.status(400).json(err);
    }
});


module.exports = router;