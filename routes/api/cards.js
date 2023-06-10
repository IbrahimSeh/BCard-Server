const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.json({ "msg": "http://localhost:8182/api/cards/" });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get("/card", async (req, res) => {
    try {
        res.json({ "msg": "http://localhost:8182/api/cards/card" });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;