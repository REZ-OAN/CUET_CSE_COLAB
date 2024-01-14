import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        error: null,
        success: false,
        data: null,
    },
    reducers: {
        registrationRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.data = null;
        },
        loginRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.data = null;
        },
        loadRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.data = null;
        },
        updateRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.data = null;
        },
        updatePasswordRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.data = null;
        },
        registrationSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.data = action.payload;
        },
        updatePasswordSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.data = action.payload;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.data = action.payload;
        },
        loadSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.data = action.payload;
        },
        logoutSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.data = action.payload;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.success = true;
            state.data = action.payload;
        },
        registrationFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.data = null;
        },
        updatePasswordFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.data = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.data = null;
        },
        loadFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.data = null;
        },
        logoutFailure: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.data = null;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
            state.data = null;
        },
        clearErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
    registrationFailure,
    registrationRequest,
    registrationSuccess,
    loginFailure,
    loginRequest,
    loginSuccess,
    loadFailure,
    loadRequest,
    loadSuccess,
    logoutFailure,
    logoutSuccess,
    updateFailure,
    updateRequest,
    updateSuccess,
    clearErrors,
    updatePasswordFailure,
    updatePasswordRequest,
    updatePasswordSuccess,
} = authSlice.actions;
export default authSlice.reducer;
