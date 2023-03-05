import { useEffect, useState } from "react"
import Post from "../components/Post";
import {Box, Card, CardHeader, FormControl, TextField, Button} from "@mui/material";
import { useAuthUser } from "react-auth-kit";

//Front page
export default function HomePage() {
    const [posts, setPosts] = useState([]);
    const user = useAuthUser();
    console.log(user())
    useEffect(()=> {
        let isMounted = false;
        fetch("/api/post/").then(res => res.json()).then(data =>{
            if(isMounted){
                setPosts(data)
            }
        }).catch(console.error);
    })

    const handlePost = (e) => {
        e.preventDefault();
        const data = {
            "email": user()?.email, 
            "postContent":e.target.postContent.value,
            "postTitle":e.target.postTitle.value,
        }
        fetch("/api/post/", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
            mode: "cors",
        }).catch(console.error);
    }

    

    return <>
        <Box>
            <h1>Hello World!</h1>
            <ul>
                {posts.map(post => <Post post={post} />)}
            </ul>
        </Box>
        <Box>
            <Card>
                <h1>Post</h1>
                <form onSubmit={handlePost}>
                    <FormControl>
                        <TextField equired={true} name="postTitle" id="text" label="Intresting title!" />
                        <TextField equired={true} name="postContent" id="text" label="Write your code!" />
                        <Button variant="primary" type="submit">POST!</Button>
                    </FormControl>
                </form>
            </Card>
        </Box>
    </>
}