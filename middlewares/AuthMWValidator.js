const validator = require("../util/AuthValidator");


module.exports = (req, res, nxt) => {
    let valid = validator(req.body);

    if (!valid) return res.status(400).send({ message: "Invalid information.." });

    nxt();
}