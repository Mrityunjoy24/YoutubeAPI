"use strict";
const config = require("./config");
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

let currentWeather = async (req, res, next) => {
    try {
        

    } catch (error) {
        console.log(error);
        res.status(500).json(100);
    }
}

module.exports = currentWeather;
