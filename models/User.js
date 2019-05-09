const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SchemaUser = new Schema({
    Login: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", SchemaUser);
module.exports = User;