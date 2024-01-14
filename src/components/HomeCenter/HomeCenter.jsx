import React, { Fragment, useEffect, useState } from "react";
import "./HomeCenter.css";
import PostShare from "../PostShare/PostShare";
import PostCard from "../PostCard/PostCard";
import axios from "axios";
function convertPrismaDateTime(prismaDateTime) {
    // Parse the Prisma DateTime string
    const prismaDate = new Date(prismaDateTime);

    // Options for formatting the date
    const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    // Options for formatting the time in Bangladesh time (GMT+6)
    const timeOptions = {
        timeZone: "Asia/Dhaka",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };

    // Format the date and time
    const formattedDate = prismaDate.toLocaleString(undefined, dateOptions);
    const formattedTime = prismaDate.toLocaleString(undefined, timeOptions);

    return `${formattedDate} ${formattedTime}`;
}
const HomeCenter = ({ isFeed }) => {
    const isLogged = window.localStorage.getItem("isLogged") === "true";
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get("/api/v1/adminapprovedposts");
            const postsData = data.posts.map((post) => {
                const pickyData = {
                    authorId: post.authorId,
                    postId: post.id,
                    createdAt: convertPrismaDateTime(post.createdAt),
                    attachments: [...post.attachment],
                    comments: [...post.comments],
                    content: post.content,
                    authorName: post.author.name,
                    authorAvatar: post.author.avatar,
                };
                return pickyData;
            });
            setPosts(postsData);
        };
        fetch();
    }, []);
    return (
        <Fragment>
            <div className="home-center-container">
                {!isFeed && isLogged && <PostShare />}

                <div className="posts">
                    {posts &&
                        posts.map((post) => (
                            <PostCard key={post.postId} postDetails={post} />
                        ))}
                </div>
            </div>
        </Fragment>
    );
};

export default HomeCenter;
