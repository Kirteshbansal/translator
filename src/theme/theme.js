import { createTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const theme = createTheme({
    palette: {
        primary: {
            main: blue[600],
        },
    },
});

export default theme;
