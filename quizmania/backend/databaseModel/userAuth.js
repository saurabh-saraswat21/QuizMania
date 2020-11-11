const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserCredentials = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 5
    }


});

const UserCrad = mongoose.model('UserCrad', UserCredentials);
module.exports = UserCrad;