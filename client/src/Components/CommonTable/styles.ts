import { makeStyles } from '@material-ui/core/styles';

export const useCommonTabletyles = makeStyles({
    tableHeadRow: {
        background: "#4472c4",
        "& > th": {
            color: "white",
            fontSize: "13px",
            fontWeight: "bold",
            padding: "0 0 0 6px !important",
            verticalAlign: "top"
        }
    },
    tableCell: {
    },
    oddTableCellColor: {
        background: "#9faffd"
    },
    evenTableCellColor: {
        background: "#a5b9ff"
    },
    paginationRow: {
        display: "flex",
        background: "#9faffd"
    },
    pagination: {
        margin: "auto",
    }
});