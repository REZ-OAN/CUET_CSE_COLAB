import React, { Fragment, useEffect, useState } from "react";
import AdminLeft from "../../components/AdminLeft/AdminLeft";
import "./Dashboard.css";
import Table from "../../components/Table/Table";
import axios from "axios";
const Dashboard = () => {
    const isAdmin = window.localStorage.getItem("isAdmin") === "true";
    const [usersPending, setUsersPending] = useState([]);
    const [postsPending, setPostsPending] = useState([]);
    const [achievmentPending, setAchievementPending] = useState([]);
    const [Data, setData] = useState({});
    useEffect(() => {
        const fetch = async () => {
            const { data: dataCounts } = await axios.get("/api/v1/getcounts");
            setData(dataCounts);
            const { data: postData } = await axios.get(
                "/api/v1/adminpendingposts"
            );
            const postsPedingData = postData.posts.map((post) => {
                const pickyData = {
                    postId: post.id,
                    content: post.content,
                    authorId: post.authorId,
                    authorName: post.author.name,
                    currStatus: post.status,
                    status: "",
                };
                return { ...pickyData };
            });
            const { data: userData } = await axios.get(
                "/api/v1/admin/pendinguser"
            );
            const usersPendingData = userData.users.map((user) => {
                const pickyData = {
                    authorName: user.name,
                    authorId: user.id,
                    currStatus: user.status,
                    studentId: user.studentId,
                    status: "",
                };
                return { ...pickyData };
            });
            const { data: achievementData } = await axios.get(
                "/api/v1/adminpendingachievements"
            );
            const achievmentsPendingData = achievementData.achievements.map(
                (achievement) => {
                    const pickyData = {
                        achievementId: achievement.id,
                        content: achievement.content,
                        authorId: achievement.authorId,
                        authorName: achievement.author.name,
                        currStatus: achievement.status,
                        status: "",
                    };
                    return { ...pickyData };
                }
            );
            setPostsPending(postsPedingData);
            setUsersPending(usersPendingData);
            setAchievementPending(achievmentsPendingData);
        };
        fetch();
    }, []);
    return (
        <Fragment>
            {isAdmin && (
                <Fragment>
                    <div className="admin-dashboard">
                        <AdminLeft />
                        <div className="dashboard-panel">
                            <div className="monitizing-divs">
                                <div className="num">
                                    Posts <span>{Data?.postCount || "0"}</span>
                                </div>
                                <div className="num">
                                    Users <span>{Data?.userCount || "0"}</span>
                                </div>
                                <div className="num">
                                    Achievements{" "}
                                    <span>{Data?.achievementCount || "0"}</span>
                                </div>
                                <div className="num">
                                    Alumni{" "}
                                    <span>{Data?.alumniCount || "0"}</span>
                                </div>
                            </div>
                            <div className="approval-tables">
                                <div className="peding-user-approval">
                                    <h2>Users Approval</h2>
                                    {usersPending && (
                                        <Table
                                            who={"user"}
                                            rows={usersPending}
                                        />
                                    )}
                                </div>
                                <div className="pending-posts">
                                    <h2>Posts Approval</h2>
                                    {postsPending && (
                                        <Table
                                            who={"post"}
                                            rows={postsPending}
                                        />
                                    )}
                                </div>
                                <div className="pending-achievements">
                                    <h2>Achievements Approval</h2>
                                    {achievmentPending && (
                                        <Table
                                            who={"achievement"}
                                            rows={achievmentPending}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Dashboard;
