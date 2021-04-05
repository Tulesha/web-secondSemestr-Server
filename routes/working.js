const weather = require("./weather");
const favourites = require("./favourites");

function working (app, mongoose) {
    weather(app);
    favourites(app, mongoose);
}

module.exports.working = working;