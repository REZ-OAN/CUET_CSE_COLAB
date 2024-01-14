import React, { Fragment, useEffect, useState } from "react";
import {
    TextField,
    Box,
    IconButton,
    Button,
    Input,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, FileUpload } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    registerUser,
    loginUser,
    clearErrors,
} from "../../redux/actions/authActions.js";
import { toast } from "react-toastify";
import toastOptions from "../../utils/toastifyOptions.js";
import "./Auth.css";
import Loader from "../../components/Loader/Loader";
const Auth = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { success, data, error, loading } = useSelector(
        (state) => state.user
    );
    const navigate = useNavigate();
    // for auth
    const [studentId, setStudentId] = useState("/default_image.png");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    // for services
    const [previewImage, setPreviewImage] = useState("/default_image.png");
    const [showPassword, setShowPassword] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);
    const isDisableSignUp = !email || !studentId || !password || !userName;
    const isDisableSignIn = !email || !password;
    const toggleSign = (e) => {
        e.preventDefault();
        setIsSignIn(!isSignIn);
        setEmail("");
        setPassword("");
        setPreviewImage("/default_image.png");
        setStudentId("/default_image.png");
        setUserName("");
    };
    const singInHandler = (e) => {
        e.preventDefault();
        const reqBody = {
            email,
            password,
        };
        let canLog = true;
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error("Enter Valid Email", { ...toastOptions });
            canLog = false;
        }
        if (password.length < 6 || password.length > 32) {
            toast.error("Min 6  and Max 32 characters needed as password", {
                ...toastOptions,
            });
            canLog = false;
        }
        if (canLog) {
            dispatch(loginUser(reqBody));
        }
    };
    const singUpHandler = (e) => {
        e.preventDefault();
        const reqBody = {
            name: userName,
            email,
            password,
            studentId,
        };
        let canLog = true;
        if (!email || !password) {
            toast.error("Email and Passwor is Required", { ...toastOptions });
            canLog = false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error("Enter A Valid Email", { ...toastOptions });
            canLog = false;
        }
        if (password.length < 6 || password.length > 32) {
            toast.error("Min 6  and Max 32 characters needed as password", {
                ...toastOptions,
            });
            canLog = false;
        }
        if (canLog) {
            dispatch(registerUser(reqBody));
        }
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const fileHandler = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPreviewImage(reader.result);
                setStudentId(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    useEffect(() => {
        if (data?.user) {
            if (data.user.status === "notVerified") {
                navigate("/auth");
                window.location.reload();
            } else {
                if (data.user.status == "admin") {
                    window.localStorage.setItem("isAdmin", "true");
                    navigate("/admin/dashboard");
                    window.location.reload();
                }
                window.localStorage.setItem("isLogged", "true");
                navigate("/profile");
                window.location.reload();
            }
        }
        if (error) {
            dispatch(clearErrors());
        }
    }, [error, data?.user]);
    return (
        <Fragment>
            {loading ? (
                <Loader isOpen={loading} />
            ) : (
                <Fragment>
                    <div className="auth-container">
                        <div className="logo-side">
                            <img src="/cuetlogo.png" />
                            <h1>
                                CUET CSE
                                <br />
                                COLAB
                            </h1>
                        </div>
                        <div
                            className="info-side"
                            style={{
                                height: isSignIn ? "550px" : "850px",
                                transitionDuration: isSignIn ? ".8s" : ".45s",
                                transitionTimingFunction: isSignIn
                                    ? "cubic-bezier(0.25, 0.1, 0.25, 1)"
                                    : "cubic-bezier(0.25, 0.1, 0.575, 1.6)",
                            }}
                        >
                            <Typography
                                variant="h1"
                                fontFamily="roboto"
                                fontWeight="700"
                            >
                                {isSignIn ? "Sign In" : "Sign Up"}
                            </Typography>
                            {!isSignIn && (
                                <TextField
                                    type="text"
                                    label="Name"
                                    required
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    placeholder="enter your full name"
                                    variant="standard"
                                    sx={{
                                        width: "500px",
                                    }}
                                />
                            )}
                            <TextField
                                type="email"
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="enter your email"
                                variant="standard"
                                sx={{
                                    width: "500px",
                                }}
                            />
                            {!isSignIn && (
                                <>
                                    <label htmlFor="upload-photo">
                                        <Input
                                            style={{ display: "none" }}
                                            id="upload-photo"
                                            variant="standard"
                                            name="upload-photo"
                                            type="file"
                                            onChange={fileHandler}
                                        />

                                        <Button
                                            color={theme.secondary}
                                            variant="outlined"
                                            component="span"
                                            sx={{
                                                fontSize: "16px",
                                                width: "500px",
                                            }}
                                        >
                                            Share your student ID card's back
                                            photo
                                            <FileUpload
                                                sx={{ margin: "0 10px" }}
                                            />
                                        </Button>
                                    </label>
                                    <div className="preview-image">
                                        <img src={previewImage} />
                                    </div>
                                </>
                            )}
                            <Box
                                sx={{
                                    width: "500px",
                                    height: "50px",
                                }}
                            >
                                <TextField
                                    label="Password"
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    placeholder="enter your password"
                                    variant="standard"
                                    type={showPassword ? "text" : "password"}
                                    sx={{
                                        width: "500px",
                                    }}
                                />
                                <IconButton
                                    aria-label="toggle password visibility"
                                    sx={{
                                        margin: "10px -50px",
                                    }}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? (
                                        <VisibilityOff
                                            sx={{ fontSize: "20px" }}
                                        />
                                    ) : (
                                        <Visibility sx={{ fontSize: "20px" }} />
                                    )}
                                </IconButton>
                            </Box>
                            {isSignIn && (
                                <span>
                                    <a href="#">Forgot Password?</a>
                                </span>
                            )}
                            {isSignIn ? (
                                <Button
                                    variant="contained"
                                    color={theme.secondary}
                                    onClick={singInHandler}
                                    sx={{
                                        width: "250px",
                                        height: "50px",
                                        fontSize: "18px",
                                    }}
                                    disabled={isDisableSignIn}
                                >
                                    Sign In
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color={theme.secondary}
                                    onClick={singUpHandler}
                                    sx={{
                                        width: "250px",
                                        height: "50px",
                                        fontSize: "18px",
                                    }}
                                    disabled={isDisableSignUp}
                                >
                                    Sign Up
                                </Button>
                            )}

                            {isSignIn ? (
                                <span>
                                    <a href="#" onClick={toggleSign}>
                                        Don't have an account? Sign Up
                                    </a>
                                </span>
                            ) : (
                                <span>
                                    <a href="#" onClick={toggleSign}>
                                        Already have an account? Sign In
                                    </a>
                                </span>
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Auth;
