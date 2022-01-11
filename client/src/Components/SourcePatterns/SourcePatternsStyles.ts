import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
    header: {
        background: "#4472c4"
    },
    cell: {
        color: "white",
        fontWeight: "bold",
        fontSize: "13px"
    },
    tableDiv: {
        width: "inherit"
    }
});

export const useSourcesTableStyles = makeStyles(() => styles);