import { Avatar, Button, Input, Popper, Box } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import ChatDetails from "../../components/ChatDetails/ChatDetails";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Chats.css";

const Chats = () => {
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.user);
    const [peopleKey, setPeoplekey] = useState("");
    const [chatSection, setChatSection] = useState("");
    const [reciever, setReciever] = useState({});
    const [peoples, setPeoples] = useState([]);
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(
                `/api/v1/getusersbykeyword/${peopleKey}`
            );
            setPeoples(data);
        };
        const getChatRooms = async () => {
            const { data } = await axios.get("/api/v1/chats");
            setChatRooms(data);
        };
        if (peopleKey) {
            fetch();
        }
        if (!peopleKey) {
            getChatRooms();
        }
    }, [peopleKey]);
    const handleClick = (e) => {
        setPeoplekey(e.target.value);
    };

    return (
        <Fragment>
            <div className="chat-contianer">
                <div className="chat-persons">
                    <div className="person-header">
                        <p>Chats</p>
                        <Input
                            sx={{
                                border: "2px solid #253788",
                                boxSizing: "border-box",
                                padding: "10px",
                                fontSize: "16px",
                                width: "400px",
                                height: "50px",
                                color: "#253788",
                                fontWeight: "700",
                                borderRadius: "10px",
                                fontFamily: "Lota",
                            }}
                            placeholder="search people...."
                            onChange={handleClick}
                            value={peopleKey}
                        />
                    </div>
                    {peopleKey && (
                        <div className="searched-person">
                            {peoples && (
                                <Fragment>
                                    {peoples.map((pu) => (
                                        <Button
                                            key={pu.id}
                                            variant="text"
                                            style={{
                                                backgroundColor:
                                                    "rgba(17, 59, 96, 0.3)",
                                                backdropFilter: "blur(25px)",
                                                width: "96%",
                                                height: "80px",
                                                fontSize: "20px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "15px",
                                            }}
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                const { data } =
                                                    await axios.post(
                                                        `/api/v1/chat/createroom/${pu.id}`
                                                    );
                                                if (data) {
                                                    setPeoplekey("");
                                                    navigate("/chats");
                                                }
                                            }}
                                        >
                                            <div className="person">
                                                <Avatar
                                                    src={
                                                        pu.avatar ||
                                                        "/default_image.png"
                                                    }
                                                    sx={{
                                                        width: "64px",
                                                        height: "64px",
                                                    }}
                                                />
                                                <span>{pu.name}</span>
                                            </div>
                                        </Button>
                                    ))}
                                </Fragment>
                            )}
                        </div>
                    )}
                    <div className="persons-info">
                        {chatRooms &&
                            data?.user &&
                            chatRooms.map((chatRoom) => {
                                if (data.user.id === chatRoom.userId1) {
                                    return (
                                        <Button
                                            key={chatRoom.id}
                                            variant="text"
                                            style={{
                                                backgroundColor:
                                                    "rgba(17, 59, 96, 0.3)",
                                                backdropFilter: "blur(25px)",
                                                width: "96%",
                                                height: "85px",
                                                fontSize: "20px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "15px",
                                            }}
                                            onClick={(e) => {
                                                setChatSection(chatRoom.id);
                                                setReciever(chatRoom.user2);
                                            }}
                                        >
                                            <div className="person">
                                                <Avatar
                                                    src={
                                                        chatRoom.user2.avatar ||
                                                        "/default_image.png"
                                                    }
                                                    sx={{
                                                        width: "72px",
                                                        height: "72px",
                                                    }}
                                                />
                                                <span>
                                                    {chatRoom.user2.name}
                                                </span>
                                            </div>
                                        </Button>
                                    );
                                }
                                if (data.user.id === chatRoom.userId2) {
                                    return (
                                        <Button
                                            key={chatRoom.id}
                                            variant="text"
                                            style={{
                                                backgroundColor:
                                                    "rgba(17, 59, 96, 0.3)",
                                                backdropFilter: "blur(25px)",
                                                width: "96%",
                                                height: "85px",
                                                fontSize: "20px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "15px",
                                            }}
                                            onClick={(e) => {
                                                setChatSection(chatRoom.id);
                                                setReciever(chatRoom.user1);
                                            }}
                                        >
                                            <div className="person">
                                                <Avatar
                                                    src={
                                                        chatRoom.user1.avatar ||
                                                        "/default_image.png"
                                                    }
                                                    sx={{
                                                        width: "72px",
                                                        height: "72px",
                                                    }}
                                                />
                                                <span>
                                                    {chatRoom.user1.name}
                                                </span>
                                            </div>
                                        </Button>
                                    );
                                }
                            })}
                    </div>
                </div>
                <div className="chat-details">
                    <ChatDetails chatId={chatSection} reciever={reciever} />
                </div>
            </div>
        </Fragment>
    );
};

export default Chats;
