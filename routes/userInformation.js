const express = require("express");
const router = express.Router();


router.get("/", async (req, res, nxt) => {
    try {
        res.status(200).send({
            // this information come from AuthenticateToken middleware
            fullname: req.fullname,
            email: req.email,
            userid: req.userid
        });
    }
    catch (err) {
        nxt(err.message)
    }
});



module.exports = router;