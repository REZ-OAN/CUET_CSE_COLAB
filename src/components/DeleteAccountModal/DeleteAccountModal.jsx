import React, { Fragment, useState } from "react";
import {
    Modal,
    Box,
    Fade,
    Backdrop,
    TextField,
    IconButton,
    Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastOptions from "../../utils/toastifyOptions";
import axios from "axios";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "15px",
    border: "1.5px solid #253788",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
};

const DeleteAccountModal = ({ open, isOpen }) => {
    const navigate = useNavigate();
    const [show, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const deleteAccount = async (e) => {
        e.preventDefault();
        let canLog = true;

        console.log(confirmPassword);
        if (!confirmPassword) {
            toast.error("Password Can't be Empty", { ...toastOptions });
            canLog = false;
        }
        if (canLog) {
            const config = { header: { "Content-Type": "application/json" } };
            const { data } = await axios.delete(
                `/api/v1/user/deleteuser/${confirmPassword}`,
                config
            );

            console.log(data);
            navigate("/");
            window.location.reload();
        }
    };
    return (
        <Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => {
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
                                label="Password Confirmation"
                                required
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                                placeholder="confirm your password"
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
                                onMouseDown={handleMouseDownPassword}
                            >
                                {show ? (
                                    <VisibilityOff sx={{ fontSize: "20px" }} />
                                ) : (
                                    <Visibility sx={{ fontSize: "20px" }} />
                                )}
                            </IconButton>
                        </Box>
                        <Button
                            variant="text"
                            style={{
                                backgroundColor: "rgba(255,0,0, 0.5)",
                                backdropFilter: "blur(25px)",
                                width: "300px",
                                height: "50px",
                                fontSize: "18px",
                            }}
                            onClick={deleteAccount}
                        >
                            Delete Account
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </Fragment>
    );
};

export default DeleteAccountModal;
