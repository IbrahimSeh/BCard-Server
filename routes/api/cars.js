const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const carQueriesModel = require("../../model/carsService/carsQueries");
const carsValidationService = require("../../validation/carsValidationService");
const CustomError = require("../../utils/CustomError");
const normalizeCar = require("../../model/carsService/helpers/normalizationCarService");
const isBusinessMW = require("../../middleware/isBusinessMW");
const isBusinessOwnerMW = require("../../middleware/isBusinessOwnerMW");
const tokenMw = require("../../middleware/verifyTokenMW");
const isAdminOrBizOwnerMW = require("../../middleware/isAdminOrBizOwnerMW");
const isAdminMW = require("../../middleware/isAdminMW");
const { isValidObjectId } = require("../../utils/objectID/verifyObjectID");

//http://localhost:8181/api/cars
router.get("/", async (req, res) => {
    try {
        const allCars = await carQueriesModel.getAllCars();
        res.json(allCars);
    } catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cars/my-cars
router.get("/my-cars", tokenMw, async (req, res) => {
    try {
        /*
        I guess you don't need to check if the user is a business because it is possible that he was a business and became normal,by (PATCH) http://localhost:8181/api/users/:id
        */
        const userCars = await carQueriesModel.getUserCars(req.userData._id);
        return res.send(userCars);
    } catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cars/:carId
router.get("/:carId", async (req, res) => {
    try {
        const validateID = isValidObjectId(req.params.carId);
        if (!validateID) throw new CustomError("object-id is not a valid MongodbID");
        const carFromDB = await carQueriesModel.getCarById(req.params.carId);
        if (!carFromDB) throw new CustomError("Sorry ,car not found in database !");
        res.json(carFromDB);
    } catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cars
router.post("/", tokenMw, isAdminMW, async (req, res) => {
    try {
        console.log('car from user = ', req.body);
        await carsValidationService.createCarValidation(req.body);
        let normalCar = await normalizeCar(req.body, jwt.decode(req.headers["x-auth-token"])._id);
        const dataFromMongoose = await carQueriesModel.createCar(normalCar);
        res.json(dataFromMongoose);
    } catch (err) {
        if (err.hasOwnProperty('details')) {
            return res.status(400).send(err.details[0].message)
        }
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cars/:id
router.put("/:id", tokenMw, isBusinessOwnerMW, async (req, res) => {
    try {
        //joi the id car in isBusinessOwnerMW
        await carsValidationService.createCarValidation(req.body);
        let normalCar = await normalizeCar(req.body, jwt.decode(req.headers["x-auth-token"])._id);
        const carFromDB = await carQueriesModel.getCarById(req.params.id);
        if (!carFromDB) throw new CustomError("Sorry ,car not found in database !");
        const updatedCar = await carQueriesModel.updateCar(
            req.params.id,
            normalCar
        );
        res.json(updatedCar);
    } catch (err) {
        if (err.hasOwnProperty('details')) {
            return res.status(400).send(err.details[0].message)
        }
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cars/:id
router.patch("/:id", tokenMw, async (req, res) => {
    try {
        const validateID = isValidObjectId(req.params.id);
        if (!validateID) throw new CustomError("object-id is not a valid MongodbID");
        let carFromDB = await carQueriesModel.getCarById(req.params.id);
        if (!carFromDB) throw new CustomError("Sorry ,car not found in database !");
        const userID = jwt.decode(req.headers["x-auth-token"])._id
        //update like array
        if (carFromDB.likes.includes(userID)) {
            //remove userID
            const index = carFromDB.likes.indexOf(userID);
            if (index > -1) { // only splice array when item is found
                carFromDB.likes.splice(index, 1);
            }
        } else {
            //add it
            carFromDB.likes.push(userID);
        }
        const updatedCar = await carQueriesModel.updateCar(
            req.params.id,
            carFromDB
        );
        res.json(updatedCar);

    } catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/cars/:id
router.delete("/:id", tokenMw, isAdminOrBizOwnerMW(false, true, true), async (req, res) => {
    try {
        //joi the id car in isAdminOrBizOwnerMW
        const deletedCar = await carQueriesModel.deleteCar(req.params.id);
        if (!deletedCar) throw new CustomError("Sorry ,car not found in database !");
        res.json(deletedCar);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;