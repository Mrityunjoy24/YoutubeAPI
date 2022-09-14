"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const winston = require("winston");
const expressWinston = require("express-winston");
const helmet = require("helmet");
const config = require("./config")

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

module.exports = app;
