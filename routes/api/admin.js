const express = require("express");
const router = express.Router();
const carQueriesModel = require("../../model/carsService/carsQueries");
const CustomError = require("../../utils/CustomError");
const isAdminMw = require("../../middleware/isAdminMW");
const tokenMw = require("../../middleware/verifyTokenMW");
const { isValidBizNumber } = require("../../utils/objectID/verifyObjectID");


//http://localhost:8181/api/admin/:id
router.put("/:id", tokenMw, isAdminMw, async (req, res) => {
    try {
        const carFromDB = await carQueriesModel.getCarById(req.params.id);
        if (!carFromDB) throw new CustomError("Sorry ,car not found in database !");
        /* req.body.bizNumber = example >
        {
            "bizNumber": "100189"
        }
        */
        //check if any car have the new biz number that supply by user(req.body.bizNumber)
        const carHaveNewBizNumber = await carQueriesModel.getCarByBizNumber(req.body.bizNumber);
        if (carHaveNewBizNumber) throw new CustomError("Sorry ,one of the cars contains this number");
        //validate the new bizNumber
        if (req.body.bizNumber < 1000000 || req.body.bizNumber > 9999999) throw new CustomError("bizNumber must be between 1000000 and 9999999");
        carFromDB.bizNumber = req.body.bizNumber;
        const updatedCar = await carQueriesModel.updateCar(
            req.params.id,
            carFromDB
        );
        res.json(updatedCar);
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