import React, { Fragment, useEffect, useState } from "react";
import "../../components/HomeCenter/HomeCenter.css";
import PostCard from "../../components/PostCard/PostCard";
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
const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const { data } = await axios.get(
                `/api/v1/userapprovedachievements`
            );
            const achievementsData = data.achievements.map((achievement) => {
                const pickyData = {
                    authorId: achievement.authorId,
                    postId: achievement.id,
                    createdAt: convertPrismaDateTime(achievement.createdAt),
                    attachments: [...achievement.attachment],
                    comments: [],
                    content: achievement.content,
                    authorName: achievement.author.name,
                    authorAvatar: achievement.author.avatar,
                };
                return pickyData;
            });
            setAchievements(achievementsData);
        };
        fetch();
    }, []);
    return (
        <Fragment>
            <div className="home-center-container">
                <div className="posts">
                    {achievements &&
                        achievements.map((achievement) => (
                            <PostCard
                                key={achievement.postId}
                                postDetails={achievement}
                                isAchievement={true}
                            />
                        ))}
                </div>
            </div>
        </Fragment>
    );
};

export default Achievements;
