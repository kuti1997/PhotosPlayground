import { makeStyles } from '@material-ui/core/styles';

export const useAddSourceDialogStyles = makeStyles({
    dialogBody: {
        display: "flex",
        flexDirection: "column",
        padding: "1vh 3vw",
        width: "40vw"
    },
    dialogTitle: {
        background: "#4472c4",
        color: "white",
        fontWeight: "bold"
    }
});