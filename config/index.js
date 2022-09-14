"use strict";

let config = {
  API_KEY: process.env.YOUTUBE_API_KEY,
  PORT: process.env.PORT,
  DATABASE: "YoutubeVideos",
  VERSION: "v3"
};

module.exports = config;
