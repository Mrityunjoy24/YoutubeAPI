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
        let nextPage = req.query.nextPage;
        let limit = req.query.limit;
        if (!limit) {
            limit = config.LIMIT;
        }

        let allVideos;
        if (!nextPage) {
            let currentTime = new Date().toISOString();
            allVideos = await Video.find({ publishTime: { $lte: currentTime } }).sort({ "publishTime": -1, "_id": -1 }).limit(limit).exec();
        }
        else {
            allVideos = await Video.find({ _id: { $lt: nextPage } }).sort({ "publishTime": -1, "_id": -1 }).limit(limit).exec();
        }

        let response = {};
        response.data = allVideos;
        response.prevPage = allVideos[0]._doc._id;
        if (allVideos.length < 5) {
            response.hasNextPage = false
        }
        else {
            response.hasNextPage = true
            response.nextPage = allVideos[allVideos.length - 1]._doc._id;
        }

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json("Some Error happened!!");
    }
}

module.exports = fetchAllVideos;