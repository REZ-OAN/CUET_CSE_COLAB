import React, { Fragment, useEffect, useState } from "react";
import TableComp from "../../components/Table/Table";
import AdminLeft from "../../components/AdminLeft/AdminLeft";
import "../../utils/admin-panel-default.css";
import axios from "axios";
const AchievementTable = () => {
    const isAdmin = window.localStorage.getItem("isAdmin") === "true";
    const [achievementsApproved, setachievementsApproved] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const { data: achievementData } = await axios.get(
                "/api/v1/adminapprovedachievements"
            );
            const achievmentsApprovedData = achievementData.achievements.map(
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
            setachievementsApproved(achievmentsApprovedData);
        };
        fetch();
    }, []);
    return (
        <Fragment>
            {isAdmin && (
                <Fragment>
                    <div className="panel-table-container">
                        <AdminLeft />
                        <div className="panel-table-side">
                            <h2>Achievements</h2>
                            {achievementsApproved && (
                                <TableComp
                                    who={"achievement"}
                                    rows={achievementsApproved}
                                />
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default AchievementTable;
