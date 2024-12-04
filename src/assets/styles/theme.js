import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a custom theme
const theme = createTheme({
    typography: {
        fontFamily: "Synchrony Sans, Arial, sans-serif",
        h6: {
            fontFamily: "Synchrony Sans, Arial, sans-serif",
            fontWeight: 400,
            fontSize: '1.22rem',
        },
        h4: {
            fontFamily: "'Synchrony Sans Medium', sans-serif",
            fontSize: '1.26rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
    },
});

export default theme;