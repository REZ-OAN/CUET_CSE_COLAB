import React, { Fragment, useState } from "react";
import { Avatar, IconButton, InputAdornment, TextField } from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axios from "axios";
const AddComment = ({ postId }) => {
    const { data } = useSelector((state) => state.user);
    const [content, setContent] = useState("");
    const commentAdd = async (e) => {
        e.preventDefault();
        const reqBody = {
            content,
            postId,
        };
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            "/api/v1/createcomment",
            { ...reqBody },
            config
        );
    };
    return (
        <Fragment>
            <div className="comment-add">
                <TextField
                    variant="outlined"
                    sx={{
                        width: "800px",
                        borderWidth: "2px",
                        borderRadius: "27px", // Adjust the border radius for the entire TextField
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderWidth: "2px", // Adjust the outline width
                            },
                            borderRadius: "27px", // Adjust the border radius for the outlined input
                        },
                    }}
                    onChange={(e) => {
                        e.preventDefault();
                        setContent(e.target.value);
                    }}
                    value={content}
                    placeholder="Add Comment..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                position="start"
                                sx={{ marginRight: "10px" }}
                            >
                                <Avatar
                                    src={data?.user?.avatar || "/default_image"}
                                />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={commentAdd}
                                    sx={{
                                        fontSize: "18px",
                                        height: "60px",
                                        width: "60px",

                                        marginRight: "-15px",
                                        borderRadius: "30px",
                                    }}
                                >
                                    <SendRounded />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </Fragment>
    );
};

export default AddComment;
