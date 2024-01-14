import {
    registrationFailure,
    registrationRequest,
    registrationSuccess,
    loginFailure,
    loginRequest,
    loginSuccess,
    loadRequest,
    loadSuccess,
    loadFailure,
    logoutFailure,
    logoutSuccess,
    clearErrors as clear,
    updateFailure,
    updateSuccess,
    updateRequest,
    updatePasswordFailure,
    updatePasswordRequest,
    updatePasswordSuccess,
} from "../authSlice.js";
import axios from "axios";

export const loginUser = (userData) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            "/api/v1/login",
            { ...userData },
            config
        );
        if (data.user.status === "admin") {
            window.localStorage.setItem("isAdmin", "true");
        }
        window.localStorage.setItem("isLogged", "true");
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFailure(error.response.data));
    }
};

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch(registrationRequest());
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.post("/api/v1/register", userData, config);
        dispatch(registrationSuccess(data));
    } catch (error) {
        console.log(error);
        dispatch(registrationFailure(error.response.data));
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadRequest());
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.post("/api/v1/me", config);
        dispatch(loadSuccess(data));
    } catch (error) {
        dispatch(loadFailure(error.response.data));
    }
};

export const logoutUser = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/logout`);
        if (data) {
            window.localStorage.setItem("isAdmin", "false");
            window.localStorage.setItem("isLogged", "false");
        }
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFailure(error.response.data));
    }
};

export const updateProfile = (userInfo) => async (dispatch) => {
    try {
        dispatch(updateRequest());
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.put(
            "/api/v1/user/updateprofile",
            userInfo,
            config
        );
        dispatch(updateSuccess(data));
    } catch (error) {
        dispatch(updateFailure(error.response.message));
    }
};

export const updatePassword = (userCredentials) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest());
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.put(
            "/api/v1/user/changepassword",
            userCredentials,
            config
        );

        dispatch(updatePasswordSuccess(data));
    } catch (error) {
        dispatch(updatePasswordFailure(error));
    }
};
export const clearErrors = () => (dispatch) => {
    dispatch(clear());
};
