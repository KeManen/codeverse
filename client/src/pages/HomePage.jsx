import {Box, Card, CardHeader, FormControl, TextField, Button, CardActions} from "@mui/material";
import { useAuthHeader, useAuthUser, useIsAuthenticated} from "react-auth-kit";
import PostPage from "./PostPage";

///
/// This component is used to display the home page. It also handles the post creation.
///

export default function HomePage() {
    const user = useAuthUser();
    const token = useAuthHeader();
    const isAuthenticated = useIsAuthenticated();

    // submit a post to the backend
    const handlePost = (e) => {
        e.preventDefault();
        if(!isAuthenticated()){
            alert("You need to be logged in to post!");
            return;
        }
        const data = {
            "email": user()?.email, 
            "postContent":e.target.postContent.value,
            "postTitle":e.target.postTitle.value,
        }
        fetch("/api/post/", {
            method: "POST",
            headers: {
                "Authentication": token(),
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            mode: "cors",
        }).catch(console.error);
    }

    return <>
        <Box>
            <h1>Hello World!</h1>
        </Box>
        <Box>
            <Card>
                <CardHeader>Post</CardHeader>
                <CardActions>
                    <form onSubmit={handlePost}>
                    <FormControl>
                        <TextField equired={true} name="postTitle" id="text" label="Intresting title!" />
                        <TextField equired={true} name="postContent" id="text" label="Write your code!" />
                        <Button variant="primary" type="submit">POST!</Button>
                    </FormControl>
                </form>
                </CardActions>
            </Card>
            <PostPage />
        </Box>
    </>
}