const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const conf = require("./config");
const weather = require("./routes/weather")
const favourites = require("./routes/favourites");


const app = express();
const port = conf.port;

app.use(cors());

mongoose.set("useCreateIndex", true);

async function start () {
    try {
        let db = await mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})

        app.listen(port, () => {
            console.log("Server is started...");
        })
        app.use("/weather", weather);
    
        favourites.initSchema(db);
        app.use("/favourites", favourites.router);
    }
    catch (err) {
        console.log(err);
    }
}

start();