import React, { useEffect } from "react";
import { useState } from "react";
import {
    Paper,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Avatar,
} from "@mui/material";

function CommentSection({ commentsInfo }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        setComments(commentsInfo);
    }, [commentsInfo]);

    return (
        <Paper
            sx={{
                padding: 2,
                boxSizing: "border-box",
            }}
        >
            <List
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                }}
            >
                {comments &&
                    comments.map((comment) => (
                        <ListItem
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                borderRadius: "10px",
                                backgroundColor: "#f3f3f3",
                            }}
                            key={comment.id}
                        >
                            <Avatar
                                sx={{
                                    border: "2px solid #253788",
                                }}
                                alt={comment.author.name}
                                src={comment.author.avatar}
                            />
                            <ListItemText primary={comment.content} />
                        </ListItem>
                    ))}
            </List>
        </Paper>
    );
}

export default CommentSection;
