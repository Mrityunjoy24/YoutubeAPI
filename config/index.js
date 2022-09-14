"use strict";

let config = {
  API_KEY: process.env.YOUTUBE_API_KEY,
  PORT: process.env.PORT,
  DATABASE: "YoutubeVideosSecond",
  VERSION: "v3",
  LIMIT: 10
};

module.exports = config;
