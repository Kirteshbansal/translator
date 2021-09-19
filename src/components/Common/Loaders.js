import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    root_flex: { display: "flex", alignItems: "center", justifyContent: "center" },
}));

export const BounceLoader = ({ fixed = true, btnLoader = false }) => {
    const classes = useStyles();
    return (
        <Box className={fixed ? classes.root : classes.root_flex}>
            <div
                className={`bouncing-loader ${
                    !fixed && btnLoader ? "bouncing-loader__btn" : "bouncing-loader__default"
                }`}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Box>
    );
};
