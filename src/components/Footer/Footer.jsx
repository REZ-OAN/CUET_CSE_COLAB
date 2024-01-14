import React from "react";
import "./Footer.css";
import { Button, Divider, TextField } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { useTheme } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    MailLockOutlined,
    Phone,
    LocationOn,
    ChevronRightOutlined,
} from "@mui/icons-material";
const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "--TextField-brandBorderColor": "#C899F5",
                    "--TextField-brandBorderHoverColor": "#603A70",
                    "--TextField-brandBorderFocusedColor": "#f3f3f3",
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
const Footer = () => {
    const thm = useTheme();
    return (
        <div className="footer">
            <div className="info">
                <div className="cuet-info">
                    <h2>CUET</h2>
                    <p>
                        &copy;Copyright Chittagong University of Engineering &
                        Technology
                    </p>
                    <a
                        href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSKhbwcVBGrSNdxDjrnKvbhQLljrFdFxjJbjqdrqCGChHcQKKdvmmqkvXtFjMxnskTtWBjfq"
                        target="_blank"
                    >
                        <MailLockOutlined /> &nbsp; &nbsp; registrar@cuet.ac.bd
                    </a>
                    <Divider
                        sx={{
                            bgcolor: "#b8853a",
                        }}
                    />
                    <a href="#">
                        <Phone /> &nbsp; &nbsp; +880-31-714946
                    </a>
                    <Divider sx={{ bgcolor: "#b8853a" }} />
                    <a
                        href="https://maps.app.goo.gl/ZVFCH9stZsA7NPZh8"
                        target="_blank"
                    >
                        <LocationOn /> &nbsp; &nbsp; Pahartoli, Raozan-4349
                        Chittagong, Bangladesh
                    </a>
                </div>
                <div className="usefull-links">
                    <h2>USEFULL LINKS</h2>
                    <a
                        href="https://www.cuet.ac.bd/scholarship"
                        target="_blank"
                    >
                        <ChevronRightOutlined /> Scholarship
                    </a>
                    <a href="">
                        <ChevronRightOutlined /> Canada Alumni
                    </a>
                    <a href="">
                        <ChevronRightOutlined /> USA Alumni
                    </a>
                    <a href="">
                        <ChevronRightOutlined /> Australia Alumni
                    </a>
                    <a href="">
                        <ChevronRightOutlined /> Germany Alumni
                    </a>
                </div>
                <div className="feedback">
                    <h2>Feedback</h2>
                    <ThemeProvider theme={theme}>
                        <div className="feedback-send">
                            <TextField
                                label="Email"
                                placeholder="Enter your email"
                                variant="filled"
                                sx={{ width: "350px" }}
                                InputProps={{
                                    style: {
                                        color: "#f3f3f3",
                                    },
                                    sx: {
                                        color: "#b8853a",
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        color: "#f3f3f3",
                                    },
                                }}
                            />
                            <TextField
                                label="Feedback"
                                placeholder="Write your preferences"
                                variant="filled"
                                multiline
                                sx={{ width: "350px" }}
                                InputProps={{
                                    style: {
                                        color: "#f3f3f3",
                                    },
                                    sx: {
                                        color: "#b8853a",
                                    },
                                }}
                                InputLabelProps={{
                                    sx: {
                                        color: "#f3f3f3",
                                    },
                                }}
                                maxRows={6}
                            />
                            <Button
                                sx={{
                                    bgcolor: "#f3f3f3",
                                    width: "150px",
                                    height: "50px",
                                    color: "#253788",
                                    fontSize: "18px",
                                    "&:hover": {
                                        bgcolor: "#253788",
                                        color: "#f3f3f3",
                                    },
                                }}
                            >
                                SEND
                            </Button>
                        </div>
                    </ThemeProvider>
                </div>
            </div>
            <div className="dev-info">
                <p>
                    Developed by &nbsp; &nbsp; <a href="#">CCCH</a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
