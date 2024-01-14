import {
    postRequest,
    postFailure,
    postSuccess,
    clearErrors,
} from "../postSlice.js";
import axios from "axios";

export const createPost = (reqBody) => async (dispatch) => {
    try {
        dispatch(postRequest());
        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            "/api/v1/createpost",
            { ...reqBody },
            config
        );
        dispatch(postSuccess(data));
    } catch (error) {
        dispatch(postFailure({ ...error }));
    }
};

export const getAllApprovedPost = () => async (dispatch) => {
    try {
        dispatch(postRequest());

        const config = { header: { "Content-Type": "application/json" } };
        const { data } = await axios.get("/api/v1/adminapprovedposts");
        dispatch(postSuccess(data));
    } catch (error) {
        dispatch(postFailure({ ...error }));
    }
};
