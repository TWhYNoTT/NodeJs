
module.exports = (err, req, res, nxt) => {

    if (err.type == 'entity.parse.failed')
        return res.status(400).send({ message: "Data is not in JSON fromat.." });

    console.log(err);
    return res.status(500).send({ message: "Internal server error.." });
}