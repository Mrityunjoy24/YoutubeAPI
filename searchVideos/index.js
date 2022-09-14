"use strict";
const config = require("../config");
let Video = require("../models/videoModel")
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

let searchVideos = async (req, res) => {
    try {
        const query = req.query.q;
        let results = await Video.find({ $text: { $search: query } });
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json("Some Error happened!!");
    }
}

module.exports = searchVideos;
