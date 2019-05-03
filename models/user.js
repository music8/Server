const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    playlist:[]
});

let User = new mongoose.model("User", userSchema)

module.exports = User
