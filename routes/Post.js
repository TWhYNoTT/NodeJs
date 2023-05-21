const express = require("express");
const { ObjectId } = require('mongodb');
const router = express.Router();

const { Post } = require("../models/PostModel");
const postValidator = require("../middlewares/PostMWValidator");
const authenticateToken = require("../middlewares/AuthenticateToken");
const upload = require("../middlewares/multerMW");



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
        let post = await Post.findOneAndRemove({ _id: req.params.id, email: req.email });

        if (!post) {
            res.status(400).send({ message: "Bad Request..." });
        } else {
            // Delete the associated image file (if there is one)
            if (post.imagePath) {
                fs.unlink(post.imagePath, (err) => {
                    if (err) {
                        console.log(`Error deleting image file: ${err}`);
                    }
                });
            }
            res.status(200).send({ message: "Deleted successfully..." });
        }
    } catch (err) {
        nxt(err.message);
    }
});

// Validate post body and header for create and update
router.use("/", postValidator);

// Create a new post with an image attached
router.post("/", upload.single('image'), async (req, res, nxt) => {
    try {

        // Create new post to be added to DB
        let post = new Post({
            header: req.body.header,
            body: req.body.body,
            fullname: req.fullname,
            email: req.email,
            imagePath: req.image ? req.image.path : null
        });
        await post.save();
        res.status(200).send({ message: "Posted successfully..." });
    } catch (err) {
        if (req.image) {
            fs.unlink(req.image.path, (err) => {
                if (err) {
                    console.log(`Error deleting uploaded image file: ${err}`);
                }
            });
        }
        nxt(err.message);
    }
});


router.put("/:id", postIdValidator, upload.single('image'), async (req, res, nxt) => {
    try {
        let post = await Post.findOne({ _id: req.params.id, email: req.email });

        // Delete the old image file (if there is one)
        if (post.imagePath && req.image) {
            fs.unlink(post.imagePath, (err) => {
                if (err) {
                    console.log(`Error deleting old image file: ${err}`);
                }
            });
        }

        // Update the post data with the new values
        post.header = req.body.header;
        post.body = req.body.body;
        post.imagePath = req.image ? req.image.path : post.imagePath;

        // Save the updated post to the database
        await post.save();

        res.status(200).send({ message: "Updated successfully..." });
    } catch (err) {
        if (req.image) {
            fs.unlink(req.image.path, (err) => {
                if (err) {
                    console.log(`Error deleting uploaded image file: ${err}`);
                }
            });
        }
        nxt(err.message);
    }
});




function postIdValidator(req, res, nxt) {
    if (ObjectId.isValid(req.params.id)) {
        nxt();
    } else {
        res.status(400).send({ message: "Invalid post id...." });
    }
}

module.exports = router;