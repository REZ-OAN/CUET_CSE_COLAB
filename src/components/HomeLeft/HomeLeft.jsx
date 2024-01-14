import React, { Fragment, useEffect, useState } from "react";
import "./HomeLeft.css";
import { Avatar, Button } from "@mui/material";
import {
    DynamicFeed,
    Feed,
    EmojiEvents,
    Message,
    Dashboard,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
const HomeLeft = () => {
    console.log("hell");
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const { data, loading } = useSelector((state) => state.user);
    useEffect(() => {
        setIsAdmin((state) => {
            const lack = window.localStorage.getItem("isAdmin") === "true";
            if (state !== lack) {
                return lack;
            }
            return state;
        });
        setIsLogged((state) => {
            const lack = window.localStorage.getItem("isLogged") === "true";
            if (state !== lack) {
                return lack;
            }
            return state;
        });
    }, [data?.user]);
    return (
        <Fragment>
            {isLogged &&
                (loading ? (
                    <Loader isOpen={loading} />
                ) : (
                    <Fragment>
                        <div className="home-left-container">
                            <Button
                                onClick={() => navigate("/profile")}
                                component="label"
                                variant="text"
                                sx={{
                                    width: "400px",
                                    height: "100px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "5%",
                                    paddingLeft: "10%",
                                    borderRadius: "10px",
                                    backgroundColor: "#FBC990",
                                    "&:hover": {
                                        backgroundColor: "#FBC990",
                                        border: "0px",
                                    },
                                    backdropFilter: "blur(25px)",
                                    border: "0px",
                                    fontSize: "18px",
                                }}
                                startIcon={
                                    <Avatar
                                        src={
                                            data?.user?.avatar ||
                                            "/default_image.png"
                                        }
                                        sx={{
                                            width: "64px",
                                            height: "64px",
                                            border: "2px solid #253788",
                                        }}
                                    />
                                }
                            >
                                {data?.user?.name}
                            </Button>
                            <Button
                                onClick={() => navigate("/posts")}
                                component="label"
                                variant="text"
                                sx={{
                                    width: "400px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "5%",
                                    paddingLeft: "10%",
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(37,55, 136, 0.3)",
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(37,55, 136, 0.3)",
                                    },
                                    backdropFilter: "blur(25px)",
                                    border: "0px",
                                    fontSize: "18px",
                                }}
                                startIcon={
                                    <DynamicFeed
                                        sx={{
                                            width: "48px",
                                            height: "48px",
                                        }}
                                    />
                                }
                            >
                                Your Posts
                            </Button>
                            <Button
                                onClick={(e) => navigate("/achievements")}
                                component="label"
                                variant="text"
                                sx={{
                                    width: "400px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "5%",
                                    paddingLeft: "10%",
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(37,55, 136, 0.3)",
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(37,55, 136, 0.3)",
                                    },
                                    backdropFilter: "blur(25px)",
                                    border: "0px",
                                    fontSize: "18px",
                                }}
                                startIcon={
                                    <EmojiEvents
                                        sx={{
                                            width: "48px",
                                            height: "48px",
                                        }}
                                    />
                                }
                            >
                                Your Achievements
                            </Button>

                            <Button
                                onClick={() => navigate("/feeds")}
                                component="label"
                                variant="text"
                                sx={{
                                    width: "400px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "5%",
                                    paddingLeft: "10%",
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(37,55, 136, 0.3)",
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(37,55, 136, 0.3)",
                                    },
                                    backdropFilter: "blur(25px)",
                                    border: "0px",
                                    fontSize: "18px",
                                }}
                                startIcon={
                                    <DynamicFeed
                                        sx={{
                                            width: "48px",
                                            height: "48px",
                                        }}
                                    />
                                }
                            >
                                Feeds
                            </Button>
                            <Button
                                component="label"
                                variant="text"
                                onClick={() => {
                                    navigate("/chats");
                                }}
                                sx={{
                                    width: "400px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "5%",
                                    paddingLeft: "10%",
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(37,55, 136, 0.3)",
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(37,55, 136, 0.3)",
                                    },
                                    backdropFilter: "blur(25px)",
                                    border: "0px",
                                    fontSize: "18px",
                                }}
                                startIcon={
                                    <Message
                                        sx={{
                                            width: "48px",
                                            height: "48px",
                                        }}
                                    />
                                }
                            >
                                Chats
                            </Button>
                            {isAdmin && (
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        navigate("/admin/dashboard");
                                    }}
                                    sx={{
                                        width: "400px",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        gap: "5%",
                                        paddingLeft: "10%",
                                        borderRadius: "10px",
                                        backgroundColor:
                                            "rgba(37,55, 136, 0.3)",
                                        "&:hover": {
                                            backgroundColor:
                                                "rgba(37,55, 136, 0.3)",
                                        },
                                        backdropFilter: "blur(25px)",
                                        border: "0px",
                                        fontSize: "18px",
                                    }}
                                    startIcon={
                                        <Dashboard
                                            sx={{
                                                width: "48px",
                                                height: "48px",
                                            }}
                                        />
                                    }
                                >
                                    Dashboard
                                </Button>
                            )}
                        </div>
                    </Fragment>
                ))}
        </Fragment>
    );
};

export default HomeLeft;
