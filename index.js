const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const conf = require("./config");
const dbConf = require("./db/config");
const routes = require("./routes/working");

const app = express();
const port = conf.port;
const urlDb = dbConf.urlDb;
const work = routes.working;

app.use(cors());

mongoose.set("useCreateIndex", true);

mongoose.connect(urlDb, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
        .then((mongoose) => {
            console.log("Connection to db success");

            work(app, mongoose);

            app.listen(port, () => {
                console.log("Server is started...")
            })
        })
        .catch(console.log);