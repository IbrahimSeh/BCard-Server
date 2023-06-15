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
        // console.log('after normalization = ', req.body);
        await userQueriesModel.registerUser(req.body);
        res.json(req.body);
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

//http://localhost:8181/api/users
router.get("/", async (req, res) => {
    try {
        const allUsers = await userQueriesModel.getAllUsers();
        console.log('hfjerj');
        res.json(allUsers);
    } catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/users/:id
router.get("/:id", async (req, res) => {
    try {
        //! joi validation
        const userFromDB = await userQueriesModel.getUserById(req.params.id);
        //if userFromDB == null return admin
        res.json(userFromDB);
    } catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/users/:id
router.put("/:id", async (req, res) => {
    console.log('put');
    try {
        //! joi validation
        await registerUserValidation(req.body);
        //check if user id exist in database
        const userFromDB = await userQueriesModel.getUserById(req.params.id);
        if (!userFromDB) {
            res.json("given user  id does not exist in database")
            throw new CustomError("given user  id does not exist in database");
        }
        //if the client side try to update email to exist email in DB , mongo will reject
        //update data in DB
        await userQueriesModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: "Done" });
    } catch (err) {
        res.status(400).json(err);
    }
});

//http://localhost:8181/api/users/:id
router.patch("/:id", async (req, res) => {
    console.log('patch');
    try {
        const userFromDB = await userQueriesModel.getUserById(req.params.id);
        userFromDB.isBusiness = !userFromDB.isBusiness;
        await userQueriesModel.findByIdAndUpdate(req.params.id, userFromDB);
        res.json({ isBusiness: "changed status" });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;