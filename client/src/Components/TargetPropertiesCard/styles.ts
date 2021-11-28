import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const styles = createStyles({
    targetCard: {
        padding: "5px 10px 5px 10px",
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        background: "#4472c4",
        marginBottom: "20px"
    },
    targetProperty: {
        display: "flex",
        height: "35px"
    },
    globalTextField: {
        marginLeft: "auto",
        padding: 0
    },
    innerInput: {
        background: "#9fbdf1",
        height: "20px",
        padding: 0
    },
    whiteText: {
        color: "white",
        fontSize: "13px",
        fontWeight: "bold"
    }
});

export const useStyles = makeStyles(() => styles);