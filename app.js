"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const winston = require("winston");
const expressWinston = require("express-winston");
const helmet = require("helmet");

const mongoose = require('mongoose');
const fetchAllVideos = require("./controllers/fetchVideosFromDBController");
const fetchYoutubeVideos = require("./services/fetchYoutubeVideos");
const searchVideos = require("./controllers/searchController");
const Apikeys = require("./models/keysModel");
const generateKeysDataAndPushToDB = require("./helper/generateKeysData");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', async function () {
    console.log("we are connected to database YoutubeVideos");
    // checking first if data is already there if not then create it
    let keysData = await Apikeys.find({});
    if (keysData.length == 0) {
        generateKeysDataAndPushToDB();
    }
});

setInterval(fetchYoutubeVideos, 10000);

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(helmet());


app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    metaField: "apiDetails",
    format: winston.format.combine(
        winston.format.json()
    )
}));

app.get("/healthcheck", function (req, res, next) {
    res.send({ "status": "ok" });
});

app.get("/listVideos", fetchAllVideos);
app.get("/searchVideos", searchVideos);

module.exports = app;
