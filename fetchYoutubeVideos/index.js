"use strict"

const { google } = require('googleapis');
const config = require("../config");

const youtube = google.youtube({
    version: config.VERSION,
    auth: process.env.YOUTUBE_API_KEY
});

let fetchYoutubeVideos = async () => {
    try {
        const batch = db.batch();
        let res = await youtube.search.list({
            part: 'snippet',
            q: 'sports',
            maxResults: '3',
            publishedAfter: '2022-09-01T00:00:00Z'
        })

        console.log("fetched data");
        let videosData = res.data.items;

        
        console.log("videos added to db");
        console.log("---------------------\n");
        //Video title, description, publishing datetime, thumbnails URLs and any other fields you require
    } catch (error) {
        console.error(error);
    }
}

module.exports = fetchYoutubeVideos;
fetchYoutubeVideos()