import { Card, CardContent, CardHeader, Typography } from "@mui/material";

///
/// This component is used to display a comment on a post.
///
export default function Comment({comment, username}){
    return (
    <Card variant="outlined">
        <CardHeader title={username} />
        <Typography>Comment</Typography>
        <CardContent>
            <Typography>
                {comment}
            </Typography>
        </CardContent>
    </Card>
    )
}