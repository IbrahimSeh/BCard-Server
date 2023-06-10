const express = require("express");
const router = express.Router();

const usersRouter = require("./api/users");
const cardsRouter = require("./api/cards");

// http://localhost:8181/api
router.get("/", (req, res) => {
    res.json({ msg: "home page" });
});

//http://localhost:8181/api/register
router.get("/register", (req, res) => {
    res.json({ msg: "register" });
});

//http://localhost:8181/api/login
router.get("/login", (req, res) => {
    res.json({ msg: "login" });
});

//http://localhost:8181/api/users/
router.use("/users", usersRouter);

//http://localhost:8181/api/cards
router.use("/cards", cardsRouter);

module.exports = router;
