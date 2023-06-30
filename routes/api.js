const express = require("express");
const router = express.Router();

const usersRouter = require("./api/users");
const cardsRouter = require("./api/cards");
const adminRouter = require("./api/admin");

//http://localhost:8181/api/users/
router.use("/users", usersRouter);

//http://localhost:8181/api/cards
router.use("/cards", cardsRouter);

//http://localhost:8181/api/admin
router.use("/admin", adminRouter);

module.exports = router;
