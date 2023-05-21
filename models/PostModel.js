const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    header: {
        type: String,
        required: true,
        minLength: 1,
    },
    body: {
        type: String,
        required: true,
        minLength: 1,
    },
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    modificationDate: {
        type: Date,
        default: Date.now,
    },



});

exports.Post = mongoose.model("Post", postSchema);