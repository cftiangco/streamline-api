const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageModel = new Schema({
    conversationId: {
        type:String,
        required:[true,'sender id is required']
    },
    senderId: {
        type:String,
        required:[true,'sender id is required']
    },
    message: {
        type:String,
    }
},{timestamps: true});

module.exports = mongoose.model('message', messageModel);