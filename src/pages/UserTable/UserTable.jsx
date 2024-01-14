import React, { Fragment, useEffect, useState } from "react";
import TableComp from "../../components/Table/Table";
import AdminLeft from "../../components/AdminLeft/AdminLeft";
import "../../utils/admin-panel-default.css";
import axios from "axios";
const UserTable = () => {
    const isAdmin = window.localStorage.getItem("isAdmin") === "true";
    const [usersApproved, setUsersApproved] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const { data: userData } = await axios.get(
                "/api/v1/admin/approveduser"
            );
            const usersApprovedData = userData.users.map((user) => {
                const pickyData = {
                    authorName: user.name,
                    authorId: user.id,
                    studentId: user.studentId,
                    status: "",
                    currStatus: user.status,
                };
                return { ...pickyData };
            });
            setUsersApproved(usersApprovedData);
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
                            <h2>Users</h2>
                            {usersApproved && (
                                <TableComp who={"user"} rows={usersApproved} />
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UserTable;
