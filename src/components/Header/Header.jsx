import React, { Fragment, useEffect, useState } from "react";
import {
    Avatar,
    Button,
    InputAdornment,
    TextField,
    Tooltip,
    IconButton,
    Badge,
    Typography,
    Fade,
} from "@mui/material";
import {
    SearchOutlined,
    HomeRounded,
    ChatRounded,
    LogoutRounded,
} from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions.js";
const Header = () => {
    const { data } = useSelector((state) => state.user);
    const [isLogged, setIsLogged] = useState(
        window.localStorage.getItem("isLogged") === "true"
    );
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();
    const logoutHandler = async (e) => {
        e.preventDefault();
        dispatch(logoutUser());
        navigate("/");
        window.location.reload();
    };
    return (
        <Fragment>
            <div className="nav-bar">
                <div
                    className="logo"
                    style={{ width: isLogged ? "35%" : "25%" }}
                >
                    <Avatar
                        src="/CUETLOGO.svg"
                        sx={{ width: 100, height: 100 }}
                    />
                    <p>
                        CSE Colab Bridging Alumni and Students in Collaboration
                    </p>
                </div>
                {/* <div className="search-field">
                    <TextField
                        variant="outlined"
                        sx={{
                            width: "650px",
                            borderWidth: "2px",
                            borderRadius: "27px", // Adjust the border radius for the entire TextField
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderWidth: "2px", // Adjust the outline width
                                },
                                borderRadius: "27px", // Adjust the border radius for the outlined input
                            },
                        }}
                        placeholder="Search..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlined color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        variant="text"
                                        sx={{
                                            fontSize: "18px",
                                            height: "54px",
                                            width: "150px",
                                            marginRight: "-15px",
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                            borderTopRightRadius: "27px", // Adjust the border radius as needed
                                            borderBottomRightRadius: "27px", // Adjust the border radius as needed
                                        }}
                                    >
                                        Search
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div> */}
                {isLogged && (
                    <div className="profile-info">
                        <Tooltip
                            title={<Typography fontSize={16}>Home</Typography>}
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                            color={theme.primary}
                            arrow
                        >
                            <IconButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/");
                                }}
                                aria-label="home"
                                color="primary"
                            >
                                <HomeRounded
                                    sx={{
                                        width: "48px",
                                        height: "48px",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>

                        <Tooltip
                            title={<Typography fontSize={16}>Chats</Typography>}
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                            arrow
                        >
                            <IconButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/chats");
                                    window.location.reload();
                                }}
                                aria-label="chat"
                                color="primary"
                            >
                                <ChatRounded
                                    sx={{
                                        width: "48px",
                                        height: "48px",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <Typography fontSize={16}>Profile</Typography>
                            }
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                            arrow
                        >
                            <IconButton
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/profile");
                                }}
                                aria-label="profile"
                                color="primary"
                            >
                                <Avatar
                                    src={
                                        data?.user?.avatar ||
                                        "/default_image.png"
                                    }
                                    sx={{
                                        width: "48px",
                                        height: "48px",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={
                                <Typography fontSize={16}>Logout</Typography>
                            }
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                            arrow
                        >
                            <IconButton
                                onClick={logoutHandler}
                                aria-label="logout"
                                color="primary"
                            >
                                <LogoutRounded
                                    sx={{
                                        width: "48px",
                                        height: "48px",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                )}
                {!isLogged && (
                    <div className="profile-info">
                        <Button
                            color="primary"
                            variant="contained"
                            style={{
                                width: "200px",
                                height: "60px",
                                borderRadius: "30px",
                                fontSize: "18px",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/auth");
                            }}
                        >
                            SignIn/SignUp
                        </Button>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default Header;
