import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useTheme } from "@emotion/react";
const Loader = ({ isOpen }) => {
    const theme = useTheme();
    return (
        <Backdrop
            sx={{
                color: "fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={isOpen}
        >
            <CircularProgress size={150} color={theme.secondary} />
        </Backdrop>
    );
};

export default Loader;
