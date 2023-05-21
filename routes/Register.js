const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const { User } = require("../models/UserModel");
const registerValidator = require("../middlewares/RegisterMWValidator");

router.post("/", registerValidator, async (req, res, nxt) => {

    try {
        //Check already exists
        let user = await User.findOne({ email: req.body.email }).exec();
        if (user)
            return res.status(400).send({ message: "User already registered!!" });

        //Create new user to be added to DB
        let salt = await bcrypt.genSalt(10);
        let hashedPWD = await bcrypt.hash(req.body.password, salt);
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPWD
        })
        await user.save()

        //Generate token
        const token = user.genAuthToken()



        //Send response
        res.status(200).send({
            "x-auth-token": token,
            message: "Registered successfully"
        });

    }
    catch (err) {
        nxt(err.message)

    }

});






module.exports = router;