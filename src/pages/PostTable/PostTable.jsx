import React, { Fragment, useState, useEffect } from "react";
import TableComp from "../../components/Table/Table";
import AdminLeft from "../../components/AdminLeft/AdminLeft";
import "../../utils/admin-panel-default.css";
import axios from "axios";
const PostTable = () => {
    const isAdmin = window.localStorage.getItem("isAdmin") === "true";
    const [postsApproved, setpostsApproved] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const { data: postData } = await axios.get(
                "/api/v1/adminapprovedposts"
            );
            const postsApprovedData = postData.posts.map((post) => {
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
            setpostsApproved(postsApprovedData);
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
                            <h2>Posts</h2>
                            {postsApproved && (
                                <TableComp who={"post"} rows={postsApproved} />
                            )}
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default PostTable;
