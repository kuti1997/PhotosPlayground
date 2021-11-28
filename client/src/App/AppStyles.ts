import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
    app: {
        textAlign: "center",
        background: "#9090e8",
        height: "100vh",
        display: "flex"
    },
    leftPane: {
        width: "54vw",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "35px",
        paddingTop: "20px"
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