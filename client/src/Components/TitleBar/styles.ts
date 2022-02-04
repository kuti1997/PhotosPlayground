import { makeStyles } from "@material-ui/core";

export const useTitleBarStyles = makeStyles({
    row: {
        backgroundImage: "linear-gradient(to right, #4778a6 , #5b9bd5)",
        display: "flex",
        flexDirection: "row-reverse",
        height: "24px"
    },
    iconWrapper: {
        width: "43px",
        display: "flex"
    },
    icon: {
        color: "white",
        margin: "auto"
    },
    closeButton: {
        "&:hover": {
            backgroundColor: "#ea2121"
        }
    }
});