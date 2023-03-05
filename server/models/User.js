const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for users
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

module.exports =  mongoose.model("Users", userSchema);
