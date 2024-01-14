import React, { Fragment, useEffect, useState } from "react";
import Auth from "./pages/SignInSignUp/Auth";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile/Profile";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import ScrollToTopButton from "./components/ScrollToTop/ScrollToTop";
import "./App.css";
import Chats from "./pages/Chats/Chats.jsx";
import Dashboard from "./pages/Dashboard/Dashboard";
import PostTable from "./pages/PostTable/PostTable.jsx";
import UserTable from "./pages/UserTable/UserTable.jsx";
import { loadUser } from "./redux/actions/authActions.js";
import AchievementTable from "./pages/AchievementTable/AchievementTable.jsx";
import ProfileUser from "./pages/Profile/ProfileUser.jsx";
const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
    }, []);
    return (
        <Fragment>
            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home who="home" />} />
                    <Route exact path="/auth" element={<Auth />} />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route
                        exact
                        path="/achievements"
                        element={<Home who="achievements" />}
                    />
                    <Route exact path="/posts" element={<Home who="posts" />} />

                    <Route exact path="/feeds" element={<Home who="feed" />} />
                    <Route exact path="/chats" element={<Chats />} />
                    <Route
                        exact
                        path="/admin/dashboard"
                        element={<Dashboard />}
                    />
                    <Route
                        exact
                        path="/admin/posts/approved"
                        element={<PostTable />}
                    />
                    <Route
                        exact
                        path="/admin/users/approved"
                        element={<UserTable />}
                    />
                    <Route
                        exact
                        path="/admin/achievements/approved"
                        element={<AchievementTable />}
                    />
                    <Route
                        exact
                        path="/userprofile/:id"
                        element={<ProfileUser />}
                    />
                </Routes>
                <ToastContainer />
                <ScrollToTopButton />
            </Router>
            <Footer />
        </Fragment>
    );
};
export default App;
