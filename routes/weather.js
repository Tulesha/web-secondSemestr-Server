const Requests = require("../Requests/fetch");


module.exports = function(app) {
    app.get("/weather/city", (req, res) => {
        const cityName = req.query.q;

        Requests.fetchCityByName(cityName)
                .then(data => {res.send(data);})
                .catch(() => res.status(404).send("Not found"));
    });

    app.get("/weather/coordinates", (req, res) => {
        const lat = req.query.lat;
        const lon = req.query.lon;

        Requests.fetchCityByLocation(lat, lon)
                .then(data => {res.send(data);})
                .catch(() => res.status(404).send("Not found"));
    })
}