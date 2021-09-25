import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";

import Translate from "./components/Translate";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import theme from "./theme/theme";
import "./public/css/styles.css";

const App = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="md">
                    <ErrorBoundary>
                        <Translate />
                    </ErrorBoundary>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default App;
