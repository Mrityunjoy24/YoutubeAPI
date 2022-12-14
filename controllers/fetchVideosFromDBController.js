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
        // if limit is given set default limit
        if (!limit) {
            limit = config.LIMIT;
        }
        let tempLimit = limit + 1;
        let allVideos;
        // if next page is not given search by current time
        if (!nextPage) {
            let currentTime = new Date().toISOString();
            //sort by publishTime and then by _id
            allVideos = await Video.find({ publishTime: { $lte: currentTime } }).sort({ "publishTime": -1, "_id": -1 }).limit(tempLimit).exec();
        }
        else {
            //sort by publishTime and then by _id and find all data 
            allVideos = await Video.find({ _id: { $lte: nextPage } }).sort({ "publishTime": -1, "_id": -1 }).limit(tempLimit).exec();
        }

        let response = {};
        response.prevPage = allVideos[0]._doc._id;
        if (allVideos.length < tempLimit) {
            response.hasNextPage = false
            response.data = allVideos;
        }
        else {
            response.hasNextPage = true
            response.nextPage = allVideos[allVideos.length - 1]._doc._id;
            response.data = allVideos.slice(0, allVideos.length - 1);
        }

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json("Some Error happened!!");
    }
}

module.exports = fetchAllVideos;
