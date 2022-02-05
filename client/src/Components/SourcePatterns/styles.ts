import { makeStyles } from '@material-ui/core/styles';

export const useSourcesTableStyles = makeStyles({
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
    },
    addButton: {
        background: "transparent !important"
    }
});