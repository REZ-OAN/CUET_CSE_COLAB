import React, { Fragment, useEffect, useState } from "react";
import "./PostShare.css";
import { Avatar, Button } from "@mui/material";
import { toast } from "react-toastify";
import toastOptions from "../../utils/toastifyOptions.js";
import { clearErrors, loadUser } from "../../redux/actions/authActions.js";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import AchieveMentModal from "../AchieveMentModal/AchieveMentModal";
import PostModal from "../PostModal/PostModal";
import { CollectionsRounded, SchoolRounded } from "@mui/icons-material";
const PostShare = () => {
    const [achievement, setAchievement] = useState(false);
    const [post, setPost] = useState(false);
    const { success, data, error, loading } = useSelector(
        (state) => state.user
    );
    return (
        <Fragment>
            <Fragment>
                <div className="post-modal-container">
                    <div className="post-modal-uppper">
                        <Avatar
                            src={data?.user?.avatar || "/default_image.png"}
                            sx={{
                                width: "64px",
                                height: "64px",
                            }}
                        />
                        <Button
                            style={{
                                backgroundColor: "#b8853a33",
                                width: "800px",
                                height: "64px",
                                borderRadius: "32px",
                                display: "flex",
                                paddingLeft: "30px",
                                fontSize: "18px",
                                color: "#302c4ecc",
                                justifyContent: "flex-start",
                                textTransform: "initial",
                            }}
                            onClick={() => {
                                setPost(true);
                            }}
                        >
                            What's on your mind,{" "}
                            {data?.user?.name.split(" ")[0]}?
                        </Button>
                    </div>
                    <div className="post-modal-lower">
                        <Button
                            onClick={() => {
                                setPost(true);
                            }}
                            style={{
                                backgroundColor: "#b8853a33",
                                width: "420px",
                                height: "64px",
                                borderRadius: "8px",
                                fontSize: "18px",
                                color: "#302c4e",
                            }}
                            startIcon={
                                <CollectionsRounded
                                    sx={{
                                        width: "32px",
                                        height: "32px",
                                    }}
                                />
                            }
                        >
                            Photo
                        </Button>
                        <PostModal open={post} isOpen={setPost} />
                        <Button
                            style={{
                                backgroundColor: "#b8853a33",
                                width: "420px",
                                height: "64px",
                                borderRadius: "8px",
                                fontSize: "18px",
                                color: "#302c4e",
                            }}
                            startIcon={
                                <SchoolRounded
                                    sx={{
                                        width: "32px",
                                        height: "32px",
                                    }}
                                />
                            }
                            onClick={() => {
                                setAchievement(true);
                            }}
                        >
                            Achievement
                        </Button>
                        <AchieveMentModal
                            open={achievement}
                            isOpen={setAchievement}
                        />
                    </div>
                </div>
            </Fragment>
        </Fragment>
    );
};

export default PostShare;
