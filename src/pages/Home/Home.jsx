import React, { Fragment, useState } from "react";
import "./Home.css";
import HomeLeft from "../../components/HomeLeft/HomeLeft";
import HomeCenter from "../../components/HomeCenter/HomeCenter";
import HomeRight from "../../components/HomeRight/HomeRight";
import Achievements from "../Achievements/Achievements";
import Posts from "../Posts/Posts";

const Home = ({ who }) => {
    const [isLogged, setIsLogged] = useState(
        window.localStorage.getItem("isLogged") === "true"
    );
    return (
        <Fragment>
            <div className="home-container">
                {isLogged && <HomeLeft />}
                {who === "home" && <HomeCenter isFeed={false} />}
                {who === "achievements" && isLogged && <Achievements />}
                {who === "posts" && isLogged && <Posts />}
                {who === "feed" && isLogged && <HomeCenter isFeed={true} />}
                <HomeRight />
            </div>
        </Fragment>
    );
};

export default Home;
