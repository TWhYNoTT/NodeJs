const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: val => /.+\@.+\..+/.test(val),
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: val => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-=[\]{}|;':",./<>?]).{8,}$/.test(val),
            message: '{VALUE} is not valid password'
        },
    },
});


userSchema.method("genAuthToken", function () {

    return jwt.sign({ userid: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME })


})


exports.User = mongoose.model("User", userSchema);