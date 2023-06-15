const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const {
    registerUserValidation,
    loginUserValidation,
} = require("../../validation/userValidationService");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const userQueriesModel = require("../../model/usersService/usersQueries");
const { generateToken } = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");

//http://localhost:8181/api/users
router.post("/", async (req, res) => {
    try {
        /*
         * joi
         * email unique - mongoose -> mongo
         * encrypt the password
         * normalize
         * create user
         * response user created
         */
        await registerUserValidation(req.body);
        req.body.password = await hashService.generateHash(req.body.password);
        req.body = normalizeUser(req.body);
        await userQueriesModel.registerUser(req.body);
        res.json({ msg: "register" });
    } catch (err) {
        res.status(400).json(err);
    }
});


//http://localhost:8181/api/users/login
router.post("/login", async (req, res) => {
    try {
        /**
         * *joi
         * *get user from database
         * *check password
         * *create token
         * *send to user  
         */
        await loginUserValidation(req.body);
        const userData = await userQueriesModel.getUserByEmail(req.body.email);
        if (!userData) throw new CustomError("invalid email and/or password");
        const isPasswordMatch = await hashService.cmpHash(
            req.body.password,
            userData.password
        );
        if (!isPasswordMatch)
            throw new CustomError("invalid email and/or password");
        const token = await generateToken({
            _id: userData._id,
            isAdmin: userData.isAdmin,
            isBusiness: userData.isBusiness,
        });
        res.json({ token });
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