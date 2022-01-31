import { createTheme } from "@material-ui/core";

export const appTheme = createTheme({
    overrides: {
      MuiTableCell: {
        root: {
          height: "3em",
          padding: "inherit 0",
          textAlign: "center"
        },
        head: {
          textAlign: "left"
        }
      }
    }
  });