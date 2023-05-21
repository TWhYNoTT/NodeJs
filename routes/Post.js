const express = require("express");
const { ObjectId } = require('mongodb');
const router = express.Router();

const { Post } = require("../models/PostModel");
const postValidator = require("../middlewares/PostMWValidator");
const authenticateToken = require("../middlewares/AuthenticateToken");

router.get("/", async (req, res, nxt) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        let posts = await Post.find().sort({ creationDate: -1 }).skip(skip).limit(limit);

        if (!posts) return res.status(200).send({ message: "No posts found..." });
        res.status(200).send({ page, posts: [...posts] });
    }
    catch (err) {
        nxt(err.message)
    }
});


router.use(authenticateToken);

router.delete("/:id", postIdValidator, async (req, res, nxt) => {
    try {

        let post = await Post.findOneAndRemove({ _id: req.params.id, email: req.email })

        if (!post)
            res.status(400).send({ message: "Bad Request..." })
        else
            res.status(200).send({ message: "Deleted successfully..." })

    }
    catch (err) {
        nxt(err.message)
    }
});


// validate post body and header for create and update
router.use("/", postValidator)

router.post("/", async (req, res, nxt) => {
    try {
        // Create new post to be added to DB
        let post = new Post({
            header: req.body.header,
            body: req.body.body,
            fullname: req.fullname, // this information come from AuthenticateToken middleware
            email: req.email // this information come from AuthenticateToken middleware
        });
        await post.save();
        res.status(200).send({ message: "Posted successfully..." })
    }
    catch (err) {
        nxt(err.message)
    }
});

router.put("/:id", postIdValidator, async (req, res, nxt) => {
    try {

        let post = await Post.findOneAndUpdate({ _id: req.params.id, email: req.email }, {
            $set: {
                header: req.body.header,
                body: req.body.body
            }
        })
        if (!post)
            res.status(400).send({ message: "Bad Request..." })
        else
            res.status(200).send({ message: "Updated successfully..." })

    }
    catch (err) {
        nxt(err.message)
    }
});



function postIdValidator(req, res, nxt) {

    if (ObjectId.isValid(req.params.id))

        nxt()
    else res.status(400).send({ message: "Invalid post id...." })
}



module.exports = router;