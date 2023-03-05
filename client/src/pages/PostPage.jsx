import Post from '../components/Post.jsx';

export default function PostPage(props) {
    const id = props.match.params.slug;

    return <div>
        <Post id={id} />
    </div>
}