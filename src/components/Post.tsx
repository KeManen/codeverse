'use client';
import { Card } from "@nextui-org/react";
import Comment from "./Comment";

export default function Post() {
    return <Card>
        <Card.Header title="Post Title" />
        <Card.Body>Post Content</Card.Body>
        <Card.Footer />
        <ul>
            <li><Comment /></li>
            <li><Comment /></li>
        </ul>
    </Card>
}