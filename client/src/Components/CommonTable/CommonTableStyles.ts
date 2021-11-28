import { makeStyles, createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
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
        border: "1px white solid"
    },
    oddTableCellColor: {
        background: "#e9ebf5"
    },
    evenTableCellColor: {
        background: "#cfd5ea"
    }
});

export const useCommonTabletyles = makeStyles(() => styles);