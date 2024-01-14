import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { KeyboardDoubleArrowUpRounded } from "@mui/icons-material";

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Add a scroll event listener to determine when to show the button
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const showButtonThreshold = 200;

            if (scrollY > showButtonThreshold) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <IconButton
            variant="contained"
            sx={{
                width: "64px",
                height: "64px",
            }}
            onClick={scrollToTop}
            style={{
                display: showButton ? "block" : "none",
                backgroundColor: "#b8853a",
                color: "#253788",
                position: "fixed",
                bottom: "20px",
                right: "20px",
            }}
        >
            <KeyboardDoubleArrowUpRounded
                sx={{
                    width: "36px",
                    height: "36px",
                }}
            />
        </IconButton>
    );
};

export default ScrollToTopButton;
