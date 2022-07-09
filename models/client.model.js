var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    firstname: String,
    lastname: String,
    username:String,
    password:String,
});

module.exports = mongoose.model('ClientModel', ClientSchema);