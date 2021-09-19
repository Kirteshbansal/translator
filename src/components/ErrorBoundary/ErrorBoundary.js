import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    ebRoot: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    ebContainer: {
        textAlign: "center",
        padding: "0.5em",
    },
}));

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("error", error);
        console.error("errorInfo", errorInfo);
    }

    render() {
        const { classes } = this.props;
        if (this.state.hasError) {
            return (
                <Box className={classes.rbRoot}>
                    <Box className={classes.ebContainer}>
                        <Typography>Oh no, an error! Something went wrong.</Typography>
                        <Typography>Please try refreshing the page.</Typography>
                    </Box>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default withStyles(useStyles)(ErrorBoundary);
