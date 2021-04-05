const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const conf = require("./config");
const dbConf = require("./db/config");

const app = express();
const port = conf.port;
const urlDb = dbConf.urlDb;

app.use(cors());

mongoose.set("useCreateIndex", true);

mongoose.connect(urlDb, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
        .then((mongoose) => {
            console.log("Connection to db success");

            require("./routes/working")(app, mongoose);

            app.listen(port, () => {
                console.log("Server is started...")
            })
        })
        .catch(console.log);