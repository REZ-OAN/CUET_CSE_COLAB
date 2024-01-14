import { AttachFileOutlined, SendRounded } from "@mui/icons-material";
import { Avatar, IconButton, Button } from "@mui/material";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./ChatDetails.css";
import { io } from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;
const ChatDetails = ({ chatId, reciever }) => {
    const { data } = useSelector((state) => state.user);
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [messages, setMessages] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);
    const fileHandler = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setFile(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(
                `/api/v1/chat/chatroom/message/${chatId}`
            );
            socket.emit("joinRoom", chatId);
            setMessages(data.messages);
        };
        fetch();
        selectedChatCompare = chatId;
    }, [chatId, content, file]);
    useEffect(() => {
        socket = io(ENDPOINT);
        if (data?.user) {
            socket.emit("setup", data.user);
            socket.on("connection", () => {
                setSocketConnected(true);
            });
        }
    }, [data?.user]);
    useEffect(() => {
        socket.on("recievedMessage", (message) => {
            if (
                !selectedChatCompare ||
                selectedChatCompare !== message.chatId
            ) {
                //givenoti
            } else {
                setMessages([...messages, message]);
            }
        });
    });
    const sendMessage = async (e) => {
        e.preventDefault();
        const reqBody = {
            chatId,
            content,
            file,
        };
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            "/api/v1/chat/message",
            { ...reqBody },
            config
        );
        socket.emit("sendMessage", reciever, data.message);
        setContent("");
        setFile("");
    };
    return (
        <Fragment>
            <Button
                variant="text"
                style={{
                    backgroundColor: "rgba(17, 59, 96, 0.3)",
                    backdropFilter: "blur(25px)",
                    boxSizing: "border-box",
                    paddingLeft: "40px",
                    textTransform: "inherit",
                    width: "100%",
                    height: "90px",
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    border: "2px solid #b6843d8d",
                    borderRadius: "20px",
                }}
            >
                <Avatar
                    src={reciever.avatar || "/default_image.png"}
                    sx={{
                        width: "72px",
                        height: "72px",
                    }}
                />
                <p>{reciever.name || "Baymax"}</p>
            </Button>
            <ReactScrollToBottom className="chat-body">
                {messages &&
                    data?.user &&
                    messages.map((message) => {
                        if (message.senderId === data.user.id) {
                            let attachments = "";
                            if (message.attachment) {
                                attachments = message.attachment.map(
                                    (attachment, idx) => {
                                        const isImage = [
                                            "jpg",
                                            "jpeg",
                                            "png",
                                            "gif",
                                            "bmp",
                                        ].includes(
                                            attachment.url
                                                .split(".")
                                                .pop()
                                                .toLowerCase()
                                        );
                                        if (isImage) {
                                            return (
                                                <div
                                                    key={attachment.id}
                                                    className="sender-msg"
                                                >
                                                    <Link
                                                        to={attachment.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Avatar
                                                            src={attachment.url}
                                                            sx={{
                                                                height: "480px",
                                                                width: "420px",
                                                            }}
                                                        />
                                                    </Link>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div className="sender-msg">
                                                    <Link
                                                        key={attachment.id}
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        to={attachment.url}
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                    >
                                                        File Attachment{" "}
                                                        {idx + 1}
                                                    </Link>
                                                </div>
                                            );
                                        }
                                    }
                                );
                            }
                            return (
                                <Fragment>
                                    {[...attachments]}
                                    <div className="sender-msg">
                                        {message.content}
                                    </div>
                                </Fragment>
                            );
                        } else {
                            let attachments = "";
                            if (message.attachment) {
                                attachments = message.attachment.map(
                                    (attachment, idx) => {
                                        const isImage = [
                                            "jpg",
                                            "jpeg",
                                            "png",
                                            "gif",
                                            "bmp",
                                        ].includes(
                                            attachment.url
                                                .split(".")
                                                .pop()
                                                .toLowerCase()
                                        );
                                        if (isImage) {
                                            return (
                                                <div
                                                    key={attachment.id}
                                                    className="reciever-msg"
                                                >
                                                    <Link
                                                        to={attachment.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Avatar
                                                            src={attachment.url}
                                                            sx={{
                                                                height: "480px",
                                                                width: "420px",
                                                            }}
                                                        />
                                                    </Link>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div className="reciever-msg">
                                                    <Link
                                                        key={attachment.id}
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        to={attachment.url}
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                        }}
                                                    >
                                                        File Attachment{" "}
                                                        {idx + 1}
                                                    </Link>
                                                </div>
                                            );
                                        }
                                    }
                                );
                            }
                            return (
                                <Fragment>
                                    {[...attachments]}
                                    <div className="reciever-msg">
                                        {message.content}
                                    </div>
                                </Fragment>
                            );
                        }
                    })}
            </ReactScrollToBottom>
            <div className="chat-footer">
                <textarea
                    type="text"
                    className="chat-inp"
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                />
                {/* <IconButton
                    component="label"
                    sx={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "24px",
                    }}
                >
                    <AttachFileOutlined
                        sx={{
                            width: "32px",
                            height: "32px",
                        }}
                        color="primary"
                    />
                    <input type="file" onChange={fileHandler} hidden={true} />
                </IconButton> */}
                <IconButton
                    sx={{
                        width: "48px",
                        height: "48px",

                        borderRadius: "24px",
                    }}
                    onClick={sendMessage}
                >
                    <SendRounded
                        sx={{
                            width: "32px",
                            height: "32px",
                        }}
                        color="primary"
                    />
                </IconButton>
            </div>
        </Fragment>
    );
};

export default ChatDetails;
