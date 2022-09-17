const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let videoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    publishTime: { type: String, required: true },
    videoId: { type: String, unique: true },
    thumbnail: { type: Object }
});

module.exports = mongoose.model('Videos', videoSchema);
