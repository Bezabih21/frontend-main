import React from "react";
import { PostComment } from "./PostComment";
import { Comment } from "./Comment";

export const Comments = ({postId, comments}) => {
    return (
        <>
        <h1>Comments</h1>
        {comments.map( comment => <Comment comment={comment} />)}
        <PostComment postId={postId}/>
        </>
    )
}