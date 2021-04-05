const Requests = require("../Requests/fetch");
const getFavoriteCityModel = require("../db/schema");

module.exports = function (app, mongoose) {
    const favouriteCity = getFavoriteCityModel(mongoose);

    app.get("/favourites", async (req, res) => {
        let cities = undefined;
        let error = undefined;
        let citiesArray = [];

        await favouriteCity.find().then(value => cities = value).catch(e => error = e);

        if (error) {
            console.log(error);
            res.status(500);
            return;
        }

        cities.forEach(info => citiesArray.push(info.cityName));

        res.send({favouriteCities: citiesArray})
    });

    app.post("/favourites", async (req, res) => {
        Requests.fetchCityByName(req.query.q)
                .then(async data => {
                    let city;
                    let error;

                    await favouriteCity.find({cityName: data.name})
                                       .then(value => city = value[0])
                                       .catch(e => error = e);
                    
                    if (error) {
                        console.log(error);
                        res.status(500);
                        return;
                    }

                    if (city !== undefined) {
                        res.status(409).send("City already exists");
                        return;
                    }

                    res.send(data);
                    new favouriteCity({cityName: data.name}).save();
                })
                .catch(() => res.status(404).send("Not found"));
    });

    app.delete("/favourites", async (req, res) => {
        let error;

        await favouriteCity.findOneAndRemove({cityName: req.query.q})
                           .catch(e => error = e);

        if (error) {
            console.log(error);
            res.status(500).send();
            return;
        }

        res.send();
    });
};