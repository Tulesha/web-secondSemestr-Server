const requests = require("../Requests/fetch");
const asyncHandler = require("express-async-handler");
var express = require('express');
var router = express.Router();

router.get("/city", asyncHandler (async (req, res) => {
    const {q} = req.query;

    const data = await requests.fetchCityByName(q);

    if (data == null) {
        res.status(404).send();
        return;
    }

    res.status(200).send(data);
}));

router.get("/coordinates", asyncHandler (async(req, res) => {
    const {lat, lon} = req.query;

    const data = await requests.fetchCityByLocation(lat, lon);

    if (data == null) {
        res.status(404).send();
        return;
    }

    res.status(200).send(data);
}));

module.exports = router;