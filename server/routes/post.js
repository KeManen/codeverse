let express = require("express");
let router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment")
const verifyToken = require("../auth/validateToken");

//Get posts from the database
router.get("/", async (req, res, next) => {
    await Post.find({}).then((posts) => {
        //If posts are not found, respond with an error
        if (!posts) {
            return res.status(404).send("Posts not found")
        } else {
            //If posts are found, respond with collection of posts
            return res.send(posts)
        }
    })
});

//POST route for posting posts
router.post("/", verifyToken, async (req, res) => {
    const {email, postContent, postTitle} = req.body;
    console.log("adding post", email, postContent, postTitle)
    await User.findOne({ "email" : email }).then((user) => {
        console.log("userfound!" +user)
        //If user is found, then create new post for the user and save it into the database
        if (user) {
                new Post({
                email: email,
                postTitle: postTitle,
                postContent: postContent,
            }).save().then(() => {
                return res.send("Posted!")
            }).catch((err) => {
                console.log(err)
            })
            //If user is not found, respond with an error
        } else {
            return res.status(404).send("Not found");
        }
    })
});

//GET route for comments
router.get("/comments", async (req, res) => {
    //Find comments in the database
    const { postTitle } = req.body;
    await Comment.find({"postTitle":postTitle}).then((comments) => {
        if (!comments) {
            return res.status(404).send("No comments found")
        } else {
            return res.send(comments)
        }
    })
})

//POST route for comments
router.post("/comment", verifyToken, async (req, res) => {
    const {comment, email, postTitle} = req.body
    //Find user based on the user ID on the comment body
    await User.findOne({ "email": email }).then((name) =>
        Post.findOne({"postTitle": postTitle}).then((post) => {
            //Create new comment
            new Comment({
                postTitle: postTitle,
                comment: comment,
                email: email,
            }).save().then(() => {
                return res.send("Commented!")
            }).catch((err) => {
                console.log(err)
            })
        })
    )
    return res.status(500).send("Internal server error")
})

module.exports = router;