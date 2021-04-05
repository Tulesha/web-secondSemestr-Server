const weather = require("./weather");
const favourites = require("./favourites");

module.exports = function (app, mongoose) {
    weather(app);
    favourites(app, mongoose);
}