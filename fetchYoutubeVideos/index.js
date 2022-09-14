"use strict"

const { google } = require('googleapis');
const config = require("../config");
let Video = require("../models/videoModel");

const youtube = google.youtube({
    version: config.VERSION,
    auth: process.env.YOUTUBE_API_KEY
});

let initPublishDate = '2022-09-01T00:00:00Z';
function isLater(str1, str2) {
    return new Date(str1) > new Date(str2);
}

let fetchYoutubeVideos = async () => {
    try {
        let publishedAfter = await Video.find().sort({ "publishTime": -1 }).limit(1);

        let request = {
            part: 'snippet',
            q: 'cricket',
            maxResults: '10',
            publishedAfter: publishedAfter.length > 0 ? publishedAfter[0]._doc.publishTime : initPublishDate
        }
        console.log("fetching youtube data");
        let res = await youtube.search.list(request);

        let videosData = res.data.items;

        videosData.forEach(element => {
            let videoObject = {
                title: element.snippet.title,
                description: element.snippet.description,
                publishTime: element.snippet.publishTime
            }

            var newVideo = new Video(videoObject);
            newVideo.save(function (err, video) {
                if (err) {
                    res.send(err);
                }

                console.log("video added")
            });
        });

        console.log("---------------------\n");
        //Video title, description, publishing datetime, thumbnails URLs and any other fields you require
    } catch (error) {
        console.error(error);
    }
}

module.exports = fetchYoutubeVideos;