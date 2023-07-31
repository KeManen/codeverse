const mongoose = require("mongoose");
const User = require("./User");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;

//Schema for posts
const postSchema = new Schema({
    posterId: ObjectId,
    postTitle: String,
    postContent: String,
});

module.exports =  mongoose.model("Post", postSchema);