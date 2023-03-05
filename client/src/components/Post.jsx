import { Card, CardContent, CardHeader } from "@mui/material";
import Comment from "./Comment";
import {useState, useEffect} from 'react';

export default function Post(props) {
    const [post, setPostData] = useState({})

    useEffect(() => {
        let isMounted = true;

        fetch(`/api/post/${props.id}`).then(response => response.json()).then(json => {
            if(isMounted) setPostData(json);
        }).catch(console.error);

        return () => { isMounted = false };
    }, [props.id])


    return <Card variant="outlined">
        <CardHeader title={post?.title} />
        <CardContent>
            {post?.content}
        </CardContent>
        <ul>
           {post?.comments.map((comment) => <li key={comment.id}><Comment comment={comment}/></li>)}
        </ul>
    </Card>
}