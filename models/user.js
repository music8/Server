const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    email: String,
    picture: String,
    playlist:[]
});

let User = new mongoose.model("User", userSchema)

module.exports = User