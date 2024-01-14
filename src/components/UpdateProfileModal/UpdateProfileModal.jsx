import React, { Fragment, useEffect, useState } from "react";
import {
    Modal,
    Box,
    Fade,
    TextField,
    Input,
    Button,
    Backdrop,
    Avatar,
} from "@mui/material";
import { FileUpload } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    updateProfile as profileUpdate,
} from "../../redux/actions/authActions.js";
import "./UpdateProfileModal.css";
import Loader from "../Loader/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastOptions from "../../utils/toastifyOptions.js";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: "10rem",
    bgcolor: "background.paper",
    border: "1.5px solid #253788",
    borderRadius: "15px",
    boxShadow: 24,

    p: 4,
};

const UpdateProfileModal = ({ open, isOpen }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();
    const { error, data, loading } = useSelector((state) => state.user);
    const [userName, setUserName] = useState(data?.user?.name);
    const [email, setEmail] = useState(data?.user?.email);
    const [address, setAddress] = useState(data?.user?.address);
    const [phone, setPhone] = useState(data?.user?.phoneNo);
    const [avatar, setAvatar] = useState(data?.user?.avatar);
    const fileHandler = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const updateProfile = async (e) => {
        e.preventDefault();
        const reqBody = {
            name: userName,
            email,
            avatar,
            address,
            phoneNo: phone,
        };
        let canLog = true;
        if (!userName) {
            toast.error("Name mustbe given", { ...toastOptions });
            canLog = false;
        }
        if (canLog) {
            dispatch(profileUpdate(reqBody));
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error.message, { ...toastOptions });
            setInterval(() => {}, 3000);
            dispatch(clearErrors());
        }
    }, [error]);
    const isLogged = window.localStorage.getItem("isLogged") === "true";
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
                                setAddress(data?.user?.address);
                                setAvatar(data?.user?.avatar);
                                setEmail(data?.user?.email);
                                setPhone(data?.user?.phoneNo);
                                setUserName(data?.user?.name);
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
                                    <Avatar
                                        src={avatar}
                                        sx={{
                                            height: "400px",
                                            width: "400px",
                                            border: "4px solid #B6843D",
                                        }}
                                    />
                                    <div className="update-info-profile">
                                        <TextField
                                            type="text"
                                            label="Name"
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

                                        <TextField
                                            type="email"
                                            label="Email"
                                            value={email}
                                            disabled
                                            placeholder="enter your email"
                                            variant="standard"
                                            sx={{
                                                width: "500px",
                                            }}
                                        />
                                        <TextField
                                            type="text"
                                            label="Address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                            placeholder="enter your address"
                                            variant="standard"
                                            sx={{
                                                width: "500px",
                                            }}
                                        />
                                        <TextField
                                            type="email"
                                            label="Phone"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            placeholder="enter your phone"
                                            variant="standard"
                                            sx={{
                                                width: "500px",
                                            }}
                                        />
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
                                                Upload Profile
                                                <FileUpload
                                                    sx={{ margin: "0 10px" }}
                                                />
                                            </Button>
                                        </label>
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
                                            onClick={async (e) => {
                                                await updateProfile(e);
                                                navigate("/profile");
                                                window.location.reload();
                                            }}
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </Box>
                            </Fade>
                        </Modal>
                    </Fragment>
                ))}
        </Fragment>
    );
};

export default UpdateProfileModal;
