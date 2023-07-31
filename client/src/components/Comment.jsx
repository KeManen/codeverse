import { Card, CardContent, CardHeader, Typography } from "@mui/material";

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