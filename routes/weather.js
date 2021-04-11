const requests = require("../Requests/fetch");
const asyncHandler = require("express-async-handler");


module.exports = function(app) {
    app.get("/weather/city", asyncHandler (async (req, res) => {
        const {q} = req.query;

        const data = await requests.fetchCityByName(q);

        if (data == null) {
            res.status(404).send();
            return;
        }

        res.send(data);
    }));

    app.get("/weather/coordinates", asyncHandler (async(req, res) => {
        const {lat, lon} = req.query;

        const data = await requests.fetchCityByLocation(lat, lon);

        if (data == null) {
            res.status(404).send();
            return;
        }

        res.send(data);
    }));
}