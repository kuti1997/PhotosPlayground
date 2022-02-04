import { makeStyles } from '@material-ui/core/styles';

export const useTargetCardStyles = makeStyles({
    targetCard: {
        padding: "1vh 1vw 0 1vw",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #6163ac",
        background: "#4472c4",
        marginBottom: "3vh",
        borderRadius: "11px"
    },
    targetProperty: {
        display: "flex",
        height: "7vh"
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
    },
    title: {
        fontSize: "15px",
        marginBottom: "1vh",
        height: "5vh"
    }
});