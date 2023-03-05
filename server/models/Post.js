const mongoose = require("mongoose");
const User = require("./User");

const Schema = mongoose.Schema;

//Schema for posts
const postSchema = new Schema({
    email: String,
    postTitle: String,
    postContent: String,
});

module.exports =  mongoose.model("Post", postSchema);