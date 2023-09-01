const express = require("express");
const router = express.Router();

const usersRouter = require("./api/users");
const carsRouter = require("./api/cars");
const adminRouter = require("./api/admin");
const VARRouter = require("./api/VehicleAdvertisingRequests"); // VAR = VehicleAdvertisingRequests

//http://localhost:8181/api/users/
router.use("/users", usersRouter);

//http://localhost:8181/api/cars
router.use("/cars", carsRouter);

//http://localhost:8181/api/admin
router.use("/admin", adminRouter);

//http://localhost:8181/api/VAR
router.use("/VAR", VARRouter);

module.exports = router;
