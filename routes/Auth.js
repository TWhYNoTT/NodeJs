const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const { User } = require("../models/UserModel");
const authValidator = require("../middlewares/AuthMWValidator");



router.post("/", authValidator, async (req, res, nxt) => {
    try {

        //Check email
        let user = await User.findOne({ email: req.body.email }).exec();
        if (!user)
            return res.status(400).send({ message: "Invalid email or password.." });

        //Check password
        let validPWD = await bcrypt.compare(req.body.password, user.password);
        if (!validPWD)
            return res.status(400).send({ message: "Invalid email or password.." });

        //Generate token
        const token = user.genAuthToken()


        //Send response
        res.status(200).send({
            "x-auth-token": token,
            message: "logged-in successfully"
        });
    }
    catch (err) {
        nxt(err.message)
    }

});





module.exports = router;
