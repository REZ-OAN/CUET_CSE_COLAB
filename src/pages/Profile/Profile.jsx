import React, { Fragment, useState } from "react";
import { Avatar, Button, Divider, Grid, Typography } from "@mui/material";
import "./Profile.css";
import {
    DynamicFeed,
    EmojiEvents,
    FavoriteRounded,
    GroupsRounded,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import UpdateProfileModal from "../../components/UpdateProfileModal/UpdateProfileModal";
import ChangePasswrodModal from "../../components/ChangePasswodModal/ChangePasswordModal";
import DeleteAccountModal from "../../components/DeleteAccountModal/DeleteAccountModal";
import Loader from "../../components/Loader/Loader";
import { logoutUser } from "../../redux/actions/authActions.js";
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const navigate = useNavigate();
    const isLogged = window.localStorage.getItem("isLogged") === "true";
    const { data, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [updateModal, setUpdateModal] = useState(false);
    const [passwordModal, setPasswordModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    return (
        <Fragment>
            {loading ? (
                <Loader isOpen={loading} />
            ) : (
                data?.user && (
                    <Fragment>
                        <div className="profile-container">
                            <div className="profile-info-right">
                                <div className="profile-photo">
                                    <Avatar
                                        src={
                                            data.user.avatar ||
                                            "/default_image.png"
                                        }
                                        sx={{
                                            height: "400px",
                                            width: "400px",
                                            border: "4px solid #B6843D",
                                        }}
                                    />
                                    <div className="profile-short-info">
                                        <div className="profile-name">
                                            {data.user.name}
                                        </div>
                                        <div className="profile-works">
                                            {data.user.status}
                                        </div>
                                        <div className="profile-short-address">
                                            {data.user.address}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-navigation">
                                <div className="detailed-info">
                                    <div className="profile-detailed-cols">
                                        <span>Full Name</span>
                                        <span>{data.user.name}</span>
                                    </div>
                                    <Divider />
                                    <div className="profile-detailed-cols">
                                        <span>Address</span>
                                        <span>{data.user.address}</span>
                                    </div>
                                    <Divider />
                                    <div className="profile-detailed-cols">
                                        <span>Phone No</span>
                                        <span>
                                            {data.user.phoneNo ||
                                                "xxx-xxxx-xxxx"}
                                        </span>
                                    </div>
                                    <Divider />
                                    <div className="profile-detailed-cols">
                                        <span>Email</span>
                                        <span>{data.user.email}</span>
                                    </div>
                                </div>
                                <div className="update-navigation">
                                    {/* <div className="actual-navigation">
                                        <Grid
                                            container
                                            rowSpacing={4}
                                            columnSpacing={{
                                                xs: 1,
                                                sm: 2,
                                                md: 3,
                                            }}
                                        >
                                             <Grid item sm={6}>
                                                <Button
                                                    variant="text"
                                                    style={{
                                                        backgroundColor:
                                                            "rgba(37,55, 136, 0.3)",
                                                        backdropFilter:
                                                            "blur(25px)",
                                                        width: "210px",
                                                        height: "210px",
                                                        fontSize: "18px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    <FavoriteRounded
                                                        color="primary"
                                                        sx={{
                                                            height: "64px",
                                                            width: "64px",
                                                        }}
                                                    />
                                                    <span>{4}</span>
                                                    <Typography
                                                        style={{
                                                            fontFamily: "Lota",
                                                            fontWeight: "700",
                                                        }}
                                                    >
                                                        Favorites
                                                    </Typography>
                                                </Button>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <Button
                                                    variant="text"
                                                    style={{
                                                        backgroundColor:
                                                            "rgba(182,132, 61, 0.7)",
                                                        backdropFilter:
                                                            "blur(25px)",
                                                        width: "210px",
                                                        height: "210px",
                                                        fontSize: "18px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    <GroupsRounded
                                                        color="info"
                                                        sx={{
                                                            height: "64px",
                                                            width: "64px",
                                                        }}
                                                    />
                                                    <span>{4}</span>
                                                    <Typography
                                                        style={{
                                                            fontFamily: "Lota",
                                                            fontWeight: "700",
                                                        }}
                                                    >
                                                        Followings
                                                    </Typography>
                                                </Button>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <Button
                                                    variant="text"
                                                    style={{
                                                        backgroundColor:
                                                            "rgba(182,132, 61, 0.7)",
                                                        backdropFilter:
                                                            "blur(25px)",
                                                        width: "210px",
                                                        height: "210px",
                                                        fontSize: "18px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    <EmojiEvents
                                                        color="info"
                                                        sx={{
                                                            height: "64px",
                                                            width: "64px",
                                                        }}
                                                    />
                                                    <span>{4}</span>
                                                    <Typography
                                                        style={{
                                                            fontFamily: "Lota",
                                                            fontWeight: "700",
                                                        }}
                                                    >
                                                        Achievements
                                                    </Typography>
                                                </Button>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <Button
                                                    variant="text"
                                                    style={{
                                                        backgroundColor:
                                                            "rgba(37,55, 136, 0.3)",
                                                        backdropFilter:
                                                            "blur(25px)",
                                                        width: "210px",
                                                        height: "210px",
                                                        fontSize: "18px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    <DynamicFeed
                                                        color="primary"
                                                        sx={{
                                                            height: "64px",
                                                            width: "64px",
                                                        }}
                                                    />
                                                    <span>{4}</span>
                                                    <Typography
                                                        style={{
                                                            fontFamily: "Lota",
                                                            fontWeight: "700",
                                                        }}
                                                    >
                                                        Posts
                                                    </Typography>
                                                </Button>
                                            </Grid> 
                                        </Grid>
                                    </div> */}
                                    <div className="profile-update">
                                        <Button
                                            variant="text"
                                            style={{
                                                backgroundColor:
                                                    "rgba(17, 59, 96, 0.3)",
                                                backdropFilter: "blur(25px)",
                                                width: "400px",
                                                height: "80px",
                                                fontSize: "18px",
                                            }}
                                            onClick={() => {
                                                setUpdateModal(true);
                                            }}
                                        >
                                            Update Profile
                                        </Button>
                                        <UpdateProfileModal
                                            open={updateModal}
                                            isOpen={setUpdateModal}
                                        />
                                        <Button
                                            variant="text"
                                            style={{
                                                backgroundColor:
                                                    "rgba(17, 59, 96, 0.3)",
                                                backdropFilter: "blur(25px)",
                                                width: "400px",
                                                height: "80px",
                                                fontSize: "18px",
                                            }}
                                            onClick={() => {
                                                setPasswordModal(true);
                                            }}
                                        >
                                            Change Password
                                        </Button>
                                        <ChangePasswrodModal
                                            open={passwordModal}
                                            isOpen={setPasswordModal}
                                        />
                                        <Button
                                            variant="text"
                                            style={{
                                                backgroundColor:
                                                    "rgba(255, 0, 0, 0.5)",
                                                backdropFilter: "blur(25px)",
                                                width: "400px",
                                                height: "80px",
                                                fontSize: "18px",
                                            }}
                                            onClick={() => {
                                                setDeleteModal(true);
                                            }}
                                        >
                                            Delete Account
                                        </Button>
                                        <DeleteAccountModal
                                            open={deleteModal}
                                            isOpen={setDeleteModal}
                                        />
                                        <Button
                                            variant="text"
                                            style={{
                                                backgroundColor:
                                                    "rgba(255, 0, 0, 0.5)",
                                                backdropFilter: "blur(25px)",
                                                width: "400px",
                                                height: "80px",
                                                fontSize: "18px",
                                            }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                dispatch(logoutUser());
                                                window.localStorage.setItem(
                                                    "isLogged",
                                                    "false"
                                                );
                                                window.localStorage.setItem(
                                                    "isAdmin",
                                                    "false"
                                                );
                                                navigate("/auth");
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            )}
        </Fragment>
    );
};

export default Profile;
