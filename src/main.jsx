import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
const theme = createTheme({
    palette: {
        primary: {
            main: "#253788",
        },
        secondary: {
            main: "#b8853a",
        },
        info: {
            main: "#302c4e",
        },
        background: {
            main: "#f3f3f3",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "--TextField-brandBorderColor": "#C899F5",
                    "--TextField-brandBorderHoverColor": "#603A70",
                    "--TextField-brandBorderFocusedColor": "#253788",
                    "& label.Mui-focused": {
                        color: "var(--TextField-brandBorderFocusedColor)",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                notchedOutline: {
                    borderColor: "var(--TextField-brandBorderColor)",
                },
                root: {
                    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: "var(--TextField-brandBorderHoverColor)",
                    },
                    [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                        borderColor: "var(--TextField-brandBorderFocusedColor)",
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    "&::before, &::after": {
                        borderBottom:
                            "2px solid var(--TextField-brandBorderColor)",
                    },
                    "&:hover:not(.Mui-disabled, .Mui-error):before": {
                        borderBottom:
                            "2px solid var(--TextField-brandBorderHoverColor)",
                    },
                    "&.Mui-focused:after": {
                        borderBottom:
                            "2px solid var(--TextField-brandBorderFocusedColor)",
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    "&::before": {
                        borderBottom:
                            "2px solid var(--TextField-brandBorderColor)",
                    },
                    "&:hover:not(.Mui-disabled, .Mui-error):before": {
                        borderBottom:
                            "2px solid var(--TextField-brandBorderHoverColor)",
                    },
                    "&.Mui-focused:after": {
                        borderBottom:
                            "2px solid var(--TextField-brandBorderFocusedColor)",
                    },
                },
            },
        },
    },
});
ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </>
);
