import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
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

export const useAddSourceDialogStyles = makeStyles(() => styles);