import Post from '../components/Post.jsx';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';

export default function PostPage(props) {
    const [posts, setPosts] = useState([]);
    
    useEffect(()=> {
        fetch("/api/post/").then(res => res.json()).then(data =>{
            console.log(data)
            setPosts(data)
        }).catch(console.error);
    }, [])

    return <Box>
                <ul>
                    {posts?.map(post => 
                    <li key={post?.id}>
                        <Post id={post?.id} />
                    </li>)}
                </ul>
            </Box>
}