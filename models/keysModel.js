const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ApikeysSchema = new Schema({
    index: { type: Number, required: true },
    exhausted: { type: Boolean, required: true }
});

module.exports = mongoose.model('Apikeys', ApikeysSchema);
