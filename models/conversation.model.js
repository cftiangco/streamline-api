const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const conversationModel = new Schema({
    members: {
        type:[String],
        required:[true,'Members is required'],
    },
},{timestamps: true});

module.exports = mongoose.model('conversation', conversationModel);