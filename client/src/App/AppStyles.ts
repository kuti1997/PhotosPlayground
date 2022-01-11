import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
    app: {
        textAlign: "center",
        background: "#9090e8",
        height: "100vh",
        display: "flex",
        padding: "3vh 1.5vw"
    },
    leftPane: {
        width: "43vw",
        display: "flex",
        flexDirection: "column",
    },
    rightPane: {
        width: "-webkit-fill-available"
    },
    simulateButtonDiv: {
        height: "100%",
        display: "flex"
    },
    simulateButton: {
        margin: "auto"
    }
});

export const useAppStyles = makeStyles(() => styles);