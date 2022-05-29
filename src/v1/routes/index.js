const express = require ("express");
//https://expressjs.com/fr/api.html
const router = express.Router();

router.route("/").get( (req, res) => {
    res.send("<h2> HELLO FROM " + req.baseUrl + "</h2>")
});

module.exports = router;
