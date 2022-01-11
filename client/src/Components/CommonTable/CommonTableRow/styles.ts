import { makeStyles } from "@material-ui/core";

export const useCommonTableRowStyles = makeStyles({
    row: {
        "& .hidden-button": {
            visibility: "hidden"
        },
        "&:hover .hidden-button": {
            visibility: "visible"
        }
    }
});