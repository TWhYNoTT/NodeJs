const jwt = require("jsonwebtoken");

const { User } = require("../models/UserModel");

module.exports = (req, res, nxt) => {

    // Token verify
    jwt.verify(req.headers['x-auth-token'], process.env.JWT_SECRET_KEY, async (err, data) => {
        if (err) {
            return res.status(403).send({ message: "Invalid token.." });
        }

        // Get user information
        let user = await User.findById(data.userid);

        if (!user) return res.status(400).send({ message: "Invalid token..!" });

        // Put user information in the request object to reuse it

        req.email = user.email;
        req.userid = data.userid;
        req.fullname = `${user.firstName} ${user.firstName}`;

        nxt();
    });
}