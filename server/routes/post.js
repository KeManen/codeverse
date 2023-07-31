let express = require("express");
let router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment")
const verifyToken = require("../auth/validateToken");

const createPost = async (postId) => {
    const post = await Post.findById(postId).exec();
    const user = await User.findById(post.posterId).exec();
    if(!post || !user) return null;

    return {
        "id": post._id,
        "postTitle": post.postTitle,
        "postContent": post.postContent,
        "posterName": user.username,
    }
}

const createComment = async (commentId) => {
    const comment = await Comment.findById(commentId).exec();
    const commenter = await User.findById(comment.commenterId).exec();
    if(!comment || !commenter) return null;
    
    return {
        "id": comment._id,
        "comment": comment.comment,
        "username": commenter.username,
    }
}


//Get posts from the database
router.get("/", async (req, res) => {
    try{
        const posts = await Post.find({})
        //If posts are not found, respond with an error
        if (!posts) return res.status(404).send("Posts not found")
        
        const returnPosts = await Promise.all(posts.filter(item => item !== null).map(async (post) => createPost(post._id)))
        if(!returnPosts) return res.status(500).send("Posts not found")
        return res.send(returnPosts)
    } catch(err)
    {
        console.log(err)
        return res.status(500).send("Internal server error")
    }
});

router.get("/:postId", async (req, res) =>{
    try{
        const {postId} = req.params;
        const post = await createPost(postId);
        if(!post) return res.status(404).send("Post not found")
        return res.send(post);
    } catch(err){
        console.log(err)
        return res.status(500).send("Internal server error")
    }
})


//POST route for posting posts
router.post("/", verifyToken, async (req, res) => {
    try{
        const {postContent, postTitle} = req.body;
        console.log("adding post", postContent, postTitle)
        const user = await User.findOne({ "_id" : req.user._id }).exec();
        if(!user) return res.status(404).send("User not found")
        //If user is found, then create new post for the user and save it into the database
        console.log("userfound!" +user)


        const post = await new Post({
        posterId: user._id,
        postTitle: postTitle,
        postContent: postContent,
        }).save(); 


        if(!post) return res.status(500).send("Post not saved")

        return res.send(post)

    } catch(err){
        console.log(err)
        return res.status(500).send("Internal server error")
    }
});

//GET route for comments
router.get("/:postId/comment", async (req, res) => {
    //Find comments in the database
    try{
        const { postId } = req.params
        const comments = await Comment.find({ "postId": postId }).exec()
        if(!comments) return res.status(404).send("Comments not found")
        console.log("comments" + comments)

        const returnComments = await Promise.all(comments.filter(item => item !== null).map(async (comment) => createComment(comment._id)))
        if(!returnComments) return res.status(500).send("Comments not found")
        return res.send(returnComments)
    } catch(err){
        console.log(err)
        return res.status(500).send("Internal server error")
    }
})

router.get(":postId/comment/:commentId", async (req, res) => {
    //Find comments in the database
    try{
        const { postId, commentId } = req.params;
        return res.send(await createComment(comment._id))
    } catch(err){
        console.log(err)
        return res.status(500).send("Internal server error")
    }  
})


//POST route for comments
router.post("/comment", verifyToken, async (req, res) => {
    try{
        const {comment, postId} = req.body
        //Find user based on the user ID on the comment body
        const user = await User.findById(req.user._id).exec()
        const post = await Post.findById(postId).exec()
        if(!user || !post) return res.status(404).send("User or post not found")

        //Create new comment
        const newComment = new Comment({
            commenterId: user._id,
            postId: post._id,
            comment: comment,
        }).save();

        return res.send(newComment)
    } catch(err){
        console.log(err)
        return res.status(500).send("Internal server error")
    }
})

module.exports = router;