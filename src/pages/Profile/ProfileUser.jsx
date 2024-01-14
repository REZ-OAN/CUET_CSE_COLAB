import React, { Fragment, useState, useEffect } from "react";
import { Avatar, Button, Divider, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
const Profile = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(`/api/v1/getuser/${id}`);
            setUser(data.user);
        };
        fetch();
    }, []);
    return (
        <Fragment>
            <div className="profile-container">
                <div className="profile-info-right">
                    <div className="profile-photo">
                        <Avatar
                            src={user.avatar || "/default_image.png"}
                            sx={{
                                height: "400px",
                                width: "400px",
                                border: "4px solid #B6843D",
                            }}
                        />
                        <div className="profile-short-info">
                            <div className="profile-name">{user.name}</div>
                            <div className="profile-works">{user.status}</div>
                            <div className="profile-short-address">
                                {user.address}
                            </div>

                            <div className="profile-actions">
                                <Button
                                    variant="text"
                                    style={{
                                        backgroundColor:
                                            "rgba(17, 59, 96, 0.3)",
                                        backdropFilter: "blur(25px)",
                                        width: "400px",
                                        height: "50px",
                                        fontSize: "18px",
                                    }}
                                    onClick={() => {
                                        navigate("/chats");
                                    }}
                                >
                                    Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-navigation">
                    <div className="detailed-info">
                        <div className="profile-detailed-cols">
                            <span>Full Name</span>
                            <span>{user.name}</span>
                        </div>
                        <Divider />
                        <div className="profile-detailed-cols">
                            <span>Address</span>
                            <span>{user.address}</span>
                        </div>
                        <Divider />
                        <div className="profile-detailed-cols">
                            <span>Phone No</span>
                            <span>{user.phoneNo || "xxx-xxxx-xxxx"}</span>
                        </div>
                        <Divider />
                        <div className="profile-detailed-cols">
                            <span>Email</span>
                            <span>{user.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Profile;
