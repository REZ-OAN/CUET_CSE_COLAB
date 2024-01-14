import React, { Fragment, useEffect, useState } from "react";
import { Modal, Fade, Box, Backdrop, TextField, Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AchieveMentModal = ({ open, isOpen }) => {
    const [imageData, setImageData] = useState([]);
    const [fileData, setFileData] = useState([]);
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        maxHeight: "700px",
        bgcolor: "#f3f3f3",
        borderRadius: "20px",
        border: "1px solid #253788",
        boxShadow: 100,
        p: 4,
    };
    const readFileAsDataUrl = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    resolve(reader.result);
                }
            };
            reader.onerror = () => {
                reject(new Error("Error reading file as data url"));
            };
            reader.readAsDataURL(file);
        });
    };
    const fileHandler = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        let urlEncodedData = [];
        let itemData = [];
        for (const file of files) {
            try {
                const dataURL = await readFileAsDataUrl(file);
                urlEncodedData = [dataURL, ...urlEncodedData];
                if (file.type.split("/")[0] === "image") {
                    itemData = [dataURL, ...itemData];
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (files.length === urlEncodedData.length) {
            setFileData(urlEncodedData);
            setImageData(itemData);
        }
    };
    const addAchievement = async (e) => {
        e.preventDefault();
        console.log(fileData);
        const reqBody = {
            content,
            attachments: fileData,
        };
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            "/api/v1/createachievement",
            { ...reqBody },
            config
        );
        console.log(data);
    };
    return (
        <Fragment>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => {
                    setFileData([]);
                    setImageData([]);
                    setContent("");
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
                        <TextField
                            style={{
                                width: "500px",
                                fontSize: "18px",
                                margin: "10px 50px",
                            }}
                            value={content}
                            label="Content"
                            color="secondary"
                            onChange={(e) => {
                                setContent(e.target.value);
                            }}
                            multiline
                            InputProps={{
                                style: {
                                    fontSize: "18px",
                                },
                            }}
                            maxRows={6}
                        />
                        <Button
                            component="label"
                            variant="contained"
                            style={{
                                width: "500px",
                                height: "60px",
                                fontSize: "18px",
                                margin: "10px 50px",
                            }}
                            color="secondary"
                            startIcon={<CloudUpload />}
                        >
                            Upload Attachments
                            <input
                                type="file"
                                onChange={fileHandler}
                                hidden
                                multiple
                            />
                        </Button>
                        <div className="image-list">
                            {imageData.map((image) => (
                                <img src={image} width="140px" height="180px" />
                            ))}
                        </div>
                        <Button
                            component="label"
                            variant="contained"
                            style={{
                                width: "500px",
                                height: "60px",
                                fontSize: "18px",
                                margin: "10px 50px",
                            }}
                            color="secondary"
                            onClick={async (e) => {
                                await addAchievement(e);
                                navigate("/");
                                window.location.reload();
                            }}
                        >
                            ADD
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </Fragment>
    );
};

export default AchieveMentModal;
