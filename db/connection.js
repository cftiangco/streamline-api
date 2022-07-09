require('dotenv').config()
var mongoose = require('mongoose');

module.exports = () => {
    const params = { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    };
    try {
        mongoose.connect(process.env.CONNECTION_STRING,params);
        console.log('connected to db');
    } catch (error) {
        console.log(error);
    }
}

