const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    firstname: {
        type:String,
        required:[true,'First name is required']
    },
    lastname: {
        type:String,
        required:[true,'Last name is required']
    },
    username:{
        type:String,
        unique:true,
        required:[true,'Username is required'],
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
});

/* hashing */
clientSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});


/* Static method Login */
clientSchema.statics.login = async function(username,password) {
    const client = await this.findOne({username});

    if(client) {
        const auth = await bcrypt.compare(password, client.password);
        if(auth) {
            return client;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect username');
}

module.exports = mongoose.model('clients', clientSchema);