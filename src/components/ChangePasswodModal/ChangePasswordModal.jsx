import React, { Fragment, useEffect, useState } from "react";
import {
    Modal,
    Box,
    Fade,
    Backdrop,
    TextField,
    IconButton,
    Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    logoutUser,
    updatePassword as passwordUpdate,
} from "../../redux/actions/authActions.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import toastOptions from "../../utils/toastifyOptions.js";
import Loader from "../Loader/Loader.jsx";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "420px",
    display: "flex",
    flexDirection: "column",
    aligItems: "center",
    jutifyContent: "center",
    bgcolor: "background.paper",
    borderRadius: "15px",
    border: "1.5px solid #253788",
    boxShadow: 24,
    p: 4,
};

const ChangePasswrodModal = ({ open, isOpen }) => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.user);
    const [show, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const isLogged = window.localStorage.getItem("isLogged") === "true";
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const changePassword = async (e) => {
        const reqBody = {
            oldPassword: password,
            newPassword,
        };
        let canLog = true;
        if (!newPassword || !password || !confirmPassword) {
            canLog = false;
            toast.error("All fields Must be filled", { ...toastOptions });
        }
        if (newPassword !== confirmPassword) {
            canLog = false;
            toast.error("New Password and Confirm Password Does Not Match", {
                ...toastOptions,
            });
        }
        if (canLog) {
            dispatch(passwordUpdate(reqBody));
        }
    };
    if (data?.message) {
        toast.success(data.message, { ...toastOptions });
        window.location.reload();
    }
    useEffect(() => {
        if (error) {
            toast.error(error.message, { ...toastOptions });
            setInterval(() => {}, 3000);
            window.localStorage.setItem("isAdmin", "false");
            window.localStorage.setItem("isLogged", "false");
            dispatch(logoutUser());
            dispatch(clearErrors());
        }
    }, [error]);
    return (
        <Fragment>
            {isLogged &&
                (loading ? (
                    <Loader isOpen={loading} />
                ) : (
                    <Fragment>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={() => {
                                setConfirmPassword("");
                                setNewPassword("");
                                setPassword("");
                                isOpen(false);
                            }}
                            closeAfterTransition
                            slots={{ backdrop: Backdrop }}
                            slotProps={{
                                backdrop: {
                                    timeout: 500,
                                },
                            }}
                        >
                            <Fade in={open}>
                                <Box sx={style}>
                                    <Box
                                        sx={{
                                            width: "400px",
                                            height: "50px",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        <TextField
                                            label="Old Password"
                                            required
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                            placeholder="enter your old password"
                                            variant="standard"
                                            type={show ? "text" : "password"}
                                            sx={{
                                                width: "400px",
                                            }}
                                        />
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            sx={{
                                                margin: "10px -50px",
                                            }}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                        >
                                            {show ? (
                                                <VisibilityOff
                                                    sx={{ fontSize: "20px" }}
                                                />
                                            ) : (
                                                <Visibility
                                                    sx={{ fontSize: "20px" }}
                                                />
                                            )}
                                        </IconButton>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "400px",
                                            height: "50px",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        <TextField
                                            label="New Password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                            }}
                                            placeholder="enter your new password"
                                            variant="standard"
                                            type={show ? "text" : "password"}
                                            sx={{
                                                width: "400px",
                                            }}
                                        />
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            sx={{
                                                margin: "10px -50px",
                                            }}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                        >
                                            {show ? (
                                                <VisibilityOff
                                                    sx={{ fontSize: "20px" }}
                                                />
                                            ) : (
                                                <Visibility
                                                    sx={{ fontSize: "20px" }}
                                                />
                                            )}
                                        </IconButton>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: "400px",
                                            height: "50px",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        <TextField
                                            label="Confirm Password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(
                                                    e.target.value
                                                );
                                            }}
                                            placeholder="confirm new password"
                                            variant="standard"
                                            type={show ? "text" : "password"}
                                            sx={{
                                                width: "400px",
                                            }}
                                        />
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            sx={{
                                                margin: "10px -50px",
                                            }}
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                        >
                                            {show ? (
                                                <VisibilityOff
                                                    sx={{ fontSize: "20px" }}
                                                />
                                            ) : (
                                                <Visibility
                                                    sx={{ fontSize: "20px" }}
                                                />
                                            )}
                                        </IconButton>
                                    </Box>
                                    <Button
                                        variant="text"
                                        style={{
                                            backgroundColor:
                                                "rgba(17, 59, 96, 0.3)",
                                            backdropFilter: "blur(25px)",
                                            width: "300px",
                                            height: "50px",
                                            fontSize: "18px",
                                        }}
                                        onClick={changePassword}
                                    >
                                        Update Password
                                    </Button>
                                </Box>
                            </Fade>
                        </Modal>
                    </Fragment>
                ))}
        </Fragment>
    );
};

export default ChangePasswrodModal;
