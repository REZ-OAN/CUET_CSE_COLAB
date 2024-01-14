import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        loading: false,
        error: null,
        success: false,
        data: null,
    },
    reducers: {
        postRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.data = null;
        },

        postSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.data = action.payload;
        },
        postFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.data = null;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const { postFailure, postRequest, postSuccess, clearErrors } =
    postSlice.actions;
export default postSlice.reducer;
