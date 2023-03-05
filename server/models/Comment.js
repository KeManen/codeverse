const mongoose = require("mongoose");
const Post = require("./Post");

//Schema for comments
const commentSchema = new mongoose.Schema({
    postTitle: String,
    comment: String,
    username: String
});

module.exports =  mongoose.model("Comment", commentSchema);