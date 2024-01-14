import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./HomeRight.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HomeRight = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get("/api/v1/admin/approveduser");
            setUsers(data.users);
        };
        fetch();
    }, []);
    console.log(users);
    return (
        <Fragment>
            <div className="home-right-container">
                <div className="h2">All Users</div>
                <div className="trending-topics">
                    {users &&
                        users.map((user) => {
                            if (data) {
                                if (data.user.id === user.id) {
                                    return;
                                }
                            }
                            return (
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
                                    key={user.id}
                                    onClick={() => {
                                        navigate(`/userprofile/${user.id}`);
                                    }}
                                >
                                    {user.name}
                                </Button>
                            );
                        })}
                </div>
            </div>
        </Fragment>
    );
};

export default HomeRight;
