import React, { Fragment } from "react";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AdminLeft.css";
const AdminLeft = () => {
    const navigate = useNavigate();
    const { data, loading } = useSelector((state) => state.user);
    return (
        <Fragment>
            <div className="admin-action-panel">
                <div className="admin-info">
                    <Avatar
                        src={data?.user?.avatar || "/default_image.png"}
                        sx={{
                            height: "74px",
                            width: "74px",
                            border: "3px solid #19265F",
                        }}
                    />
                    <p>{data?.user?.name}</p>
                </div>
                <div className="actions-admin">
                    <Button
                        variant="text"
                        style={{
                            backgroundColor: "rgba(37,55, 136, 0.3)",
                            backdropFilter: "blur(25px)",
                            width: "100%",
                            borderRadius: "8px",
                            height: "60px",
                            fontSize: "18px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onClick={() => {
                            navigate("/");
                            window.location.reload();
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        variant="text"
                        style={{
                            backgroundColor: "rgba(37,55, 136, 0.3)",
                            backdropFilter: "blur(25px)",
                            width: "100%",
                            borderRadius: "8px",
                            height: "60px",
                            fontSize: "18px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onClick={() => {
                            navigate("/admin/dashboard");
                            window.location.reload();
                        }}
                    >
                        Dashboard
                    </Button>
                    <Button
                        variant="text"
                        style={{
                            backgroundColor: "rgba(37,55, 136, 0.3)",
                            backdropFilter: "blur(25px)",
                            width: "100%",
                            borderRadius: "8px",
                            height: "60px",
                            fontSize: "18px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onClick={() => {
                            navigate("/admin/posts/approved");
                            window.location.reload();
                        }}
                    >
                        Posts
                    </Button>
                    <Button
                        variant="text"
                        style={{
                            backgroundColor: "rgba(37,55, 136, 0.3)",
                            backdropFilter: "blur(25px)",
                            width: "100%",
                            borderRadius: "8px",
                            height: "60px",
                            fontSize: "18px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onClick={() => {
                            navigate("/admin/users/approved");
                            window.location.reload();
                        }}
                    >
                        Users
                    </Button>
                    <Button
                        variant="text"
                        style={{
                            backgroundColor: "rgba(37,55, 136, 0.3)",
                            backdropFilter: "blur(25px)",
                            width: "100%",
                            borderRadius: "8px",
                            height: "60px",
                            fontSize: "18px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onClick={() => {
                            navigate("/admin/achievements/approved");
                            window.location.reload();
                        }}
                    >
                        Achievements
                    </Button>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminLeft;
