import { Card, CardActionArea, CardContent, CardHeader, FormControl, Typography, TextField, Button } from "@mui/material";
import Comment from "./Comment";
import {useState, useEffect} from 'react';
import { useIsAuthenticated, useAuthHeader } from "react-auth-kit";

///
/// This component is used to fetch and display a post. It also handles the comments on the post.
///

export default function Post({id}) {
    const [post, setPostData] = useState({})
    const [comments, setComments] = useState([])
    const isAuthenticated = useIsAuthenticated();
    const token = useAuthHeader();

    // fetch the post and comments and display them on the page if the component is mounted
    useEffect(() => {
        let isMounted = true;
        fetch(`/api/post/${id}`).then(response => response.json()).then(json => {
            console.log(json);
            if(isMounted) setPostData(json);
        }).catch(console.error);

        fetch(`/api/post/${id}/comment`).then(response => response.json()).then(json => {
            console.log(json);
            if(isMounted) setComments(json);
        }).catch(console.error);

        return () => { isMounted = false };
    }, [id])

    // submit a comment to the backend
    const submitComment = (e) => {
        e.preventDefault();
        if(!isAuthenticated()){
            alert("You need to be logged in to comment!");
            return;
        } 
        const data = {
            "comment": e.target.comment.value,
            "postId": id
        }
        fetch(`/api/post/comment`, {
            method: "POST",
            headers: {
                "Authentication": token(),
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            mode: "cors",
        }).then(response => response.json()).then(json => {
            console.log(json);
            setComments([...comments, json]);
        }).catch(console.error);
    }


    return <Card variant="outlined">
        <CardHeader title={post?.postTitle} />
        <h1>Title</h1>
        <Typography>
            {post?.posterName}
        </Typography>
        <CardContent>
            {post?.postContent}
        </CardContent>
        <CardActionArea>
            <Typography>Comments</Typography>
            <form onSubmit={submitComment}>
                <FormControl>
                    <TextField equired={true} name="comment" id="text" label="Write your comment!" />
                    <Button variant="primary" type="submit">POST!</Button>
                </FormControl>
            </form>
        </CardActionArea>
        <CardContent>
            <ul>
                {comments.map((comment) => <li key={comment.id}><Comment comment={comment.comment} username={comment.username}/></li>)}
            </ul>
        </CardContent>
    </Card>
}