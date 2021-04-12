const requests = require("../Requests/fetch");
const asyncHandler = require("express-async-handler");
const getFavoriteCityModel = require("../db/schema");
var express = require('express');
var router = express.Router();

let favouriteCity;

function initSchema (mongoose) {
    favouriteCity = getFavoriteCityModel(mongoose);
}

router.get("/", asyncHandler (async (req, res) => {
    let cities = await favouriteCity.find().exec();

    let citiesArray = [];

    cities.forEach(info => citiesArray.push(info.cityName));

    res.send({favouriteCities: citiesArray})
}));

router.post("/",asyncHandler (async (req, res) => {
    const {q} = req.query;

    let data = await requests.fetchCityByName(q);

    if (data == null) {
        res.status(404).send();
        return;
    }

    let exists = await favouriteCity.findOne({cityName: data.name}).exec();

    if (exists !== null) {
        res.status(409).send();
        return;
    }
    
    new favouriteCity({cityName: data.name}).save();
    res.status(201).send(data);
}));

router.delete("/",asyncHandler (async (req, res) => {
    const {q} = req.query;

    const remove = await favouriteCity.findOneAndRemove({cityName: q});
    if (remove === null) {
        res.status(404);
        res.send();
        return;
    }

    res.status(204).send();
}));

module.exports = {
    router, initSchema
}