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

mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
.then((mongoose) => {
    console.log("Connection to db success");

    app.listen(port, () => {
        console.log("Server is started...");
    })
    
    app.use("/weather", weather);
    
    favourites.initSchema(mongoose);
    app.use("/favourites", favourites.router);
})
.catch(console.log);