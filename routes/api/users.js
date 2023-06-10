const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.json({ "msg": "http://localhost:8182/api/users/" });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/user", async (req, res) => {
    try {
        res.json({ "msg": "http://localhost:8182/api/users/user" });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;