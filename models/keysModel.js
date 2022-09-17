const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ApikeysSchema = new Schema({
    index: { type: Number },
    exhausted: { type: Boolean }
});

module.exports = mongoose.model('Apikeys', ApikeysSchema);
