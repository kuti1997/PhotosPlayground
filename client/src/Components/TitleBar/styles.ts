import { makeStyles } from "@material-ui/core";

export const useTitleBarStyles = makeStyles({
    row: {
        backgroundImage: "linear-gradient(to right, #4778a6 , #5b9bd5)",
        height: "30px",
        display: "flex"
    },
    iconWrapper: {
        width: "43px",
        display: "flex"
    },
    icon: {
        color: "white",
        margin: "auto",
        height: "20px !important",
        width: "20px !important"
    },
    notCloseButtonHover: {
        "&:hover": {
            backgroundColor: "#65a4dd"
        }
    },
    closeButton: {
        "&:hover": {
            backgroundColor: "#ea2121"
        }
    },
    icons: {
        display: "flex",
        flexDirection: "row-reverse"
    },
    draggableSpace: {
        "-webkit-app-region": "drag",
        width: "-webkit-fill-available"
    }
});