"use strict";

require("dotenv").config();
const http = require("http");
const app = require("./app");
const configObj = require("./config");
const fetchYoutubeVideos = require("./fetchYoutubeVideos");
const server = http.createServer(app);


const port = configObj.PORT || 3000;

setInterval(fetchYoutubeVideos, 10000);

server.listen(port, (err) => {
    if (err) console.log(err);

    console.log(`server started at ${port}`);
});
