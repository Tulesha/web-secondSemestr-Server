const requests = require("../Requests/fetch");
const getFavoriteCityModel = require("../db/schema");
const asyncHandler = require("express-async-handler");

module.exports = function (app, mongoose) {
    const favouriteCity = getFavoriteCityModel(mongoose);

    app.get("/favourites", asyncHandler (async (req, res) => {
        let cities = await favouriteCity.find().exec();

        let citiesArray = [];

        cities.forEach(info => citiesArray.push(info.cityName));

        res.send({favouriteCities: citiesArray})
    }));

    app.post("/favourites",asyncHandler (async (req, res) => {
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

    app.delete("/favourites",asyncHandler (async (req, res) => {
        const {q} = req.query;

        const remove = await favouriteCity.findOneAndRemove({cityName: q});
        if (remove === null) {
            res.status(404);
            res.send();
            return;
        }

        res.status(204).send();
    }));
};