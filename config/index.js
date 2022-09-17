"use strict";
const apiKeys = require("../helper/apiKeys")
let config = {
  API_KEY: apiKeys,
  PORT: process.env.PORT,
  DATABASE: "YoutubeVideosSecond",
  VERSION: "v3",
  LIMIT: 10
};

module.exports = config;
