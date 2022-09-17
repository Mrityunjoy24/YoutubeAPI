"use strict"
let config = require("../config");
let Apikeys = require("../models/keysModel")
let generateKeysDataAndPushToDB = async () => {
    for (let i = 0; i < config.API_KEY.length; i++) {
        let keyData = {
            "index": i,
            "exhausted": false
        }
        let apiKeys = new Apikeys(keyData);
        apiKeys.save(function (err, video) {
            if (err) {
                res.send(err);
            }

            console.log("keys data added to db");
        });
    }
}

module.exports = generateKeysDataAndPushToDB;