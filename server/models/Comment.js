const mongoose = require("mongoose");
const Post = require("./Post");
const { ObjectId } = require("mongodb");

//Schema for comments
const commentSchema = new mongoose.Schema({
    postId: ObjectId,
    commenterId : ObjectId,
    comment: String,
});

module.exports =  mongoose.model("Comment", commentSchema);