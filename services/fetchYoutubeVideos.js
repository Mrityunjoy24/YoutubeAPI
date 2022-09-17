"use strict"

const { google } = require('googleapis');
const config = require("../config");
let Video = require("../models/videoModel");
const Apikeys = require("../models/keysModel");

let keyNumber = 0;
let youtube = google.youtube({
    version: config.VERSION,
    auth: config.API_KEY[keyNumber]
});

let initPublishDate = '2022-09-01T00:00:00Z';

let saveToDB = async (videosData) => {
    videosData.forEach(element => {
        let videoObject = {
            title: element.snippet.title,
            description: element.snippet.description,
            publishTime: element.snippet.publishTime,
            videoId: element.id.videoId,
            thumbnail: element.snippet.thumbnails
        }

        var newVideo = new Video(videoObject);
        newVideo.save(function (err, video) {
            if (err) {
                console.log("error")
            }

            console.log("video added")
        });
    });
}

let generateNewKey = async (oldKeyNumber) => {
    let updateKeyData = {
        "index": oldKeyNumber,
        "exhausted": true
    }
    const filter = { index: keyNumber };
    // `doc` is the document _before_ `update` was applied
    let res = await Apikeys.findOneAndUpdate(filter, updateKeyData);
    let responseData = await Apikeys.find({ exhausted: { $eq: false } }).limit(1);
    let newKey = -1;
    if (responseData.length != 0)
        newKey = responseData[0].index;
    return newKey;
}

let fetchYoutubeVideos = async () => {
    try {
        // let publishedAfter = await Video.find().sort({ "publishTime": -1 }).limit(1);

        let request = {
            part: 'snippet',
            q: 'cricket',
            maxResults: '20',
            publishedAfter: initPublishDate
        }

        console.log("fetching youtube data");
        let res = await youtube.search.list(request);
        // if exhausted 

        let videosData = res.data.items;
        saveToDB(videosData);


        console.log("---------------------\n");
        //Video title, description, publishing datetime, thumbnails URLs and any other fields you require
    } catch (error) {
        // console.error(error);
        keyNumber = await generateNewKey(keyNumber);
        console.log(`new key generated:${keyNumber}`)
        if (keyNumber == -1) {
            console.log("all keys exhausted")
            clearInterval(this);
        }
        else {
            youtube = google.youtube({
                version: config.VERSION,
                auth: config.API_KEY[keyNumber]
            });
        }
    }
}

module.exports = fetchYoutubeVideos;