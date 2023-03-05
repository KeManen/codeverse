import { Card, CardContent, CardHeader } from "@mui/material";

export default function Comment(props){
    return <Card variant="outlined">
        <CardHeader title={props.comment.poster} />
        <CardContent>
            {props.comment.content}
        </CardContent>
    </Card>
}