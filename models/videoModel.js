const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let videoSchema = new Schema({
    title: { type: String },
    description: { type: String },
    publishTime: { type: String }
});

module.exports = mongoose.model('Videos', videoSchema);
