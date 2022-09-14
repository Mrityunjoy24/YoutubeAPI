"use strict";
const config = require("../config");
let Video = require("../models/videoModel")

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

let fetchAllVideos = async (req, res) => {
    try {
        let publishedTime = req.query.publishedTime;
        if (!publishedTime) {
            publishedTime = new Date().toISOString();
        }

        let limit = req.query.limit;
        if (!limit) {
            limit = config.LIMIT;
        }

        let allVideos = await Video.find({ publishTime: { $lt: publishedTime } }).sort({ "publishTime": -1 }).limit(limit).exec();

        let response = {};
        response.data = allVideos;
        response.prevPage = publishedTime;
        if (allVideos.length > 0) {
            response.hasNextPage = true
            response.nextPage = allVideos[allVideos.length - 1]._doc.publishTime;
        }
        else {
            response.hasNextPage = false
        }

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json("Some Error happened!!");
    }
}

module.exports = fetchAllVideos;
