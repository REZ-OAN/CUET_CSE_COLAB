import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { loading, success, data } = useSelector((state) => state.user);

    return (
        <Fragment>
            {!loading &&
                data &&
                (data.user ? <Outlet /> : <Navigate to="/auth" />)}
        </Fragment>
    );
};

export default ProtectedRoute;
