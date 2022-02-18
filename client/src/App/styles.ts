import { makeStyles } from '@material-ui/core/styles';

export const useAppStyles = makeStyles({
    app: {
        textAlign: "center",
        backgroundImage: "linear-gradient(to right, #4778a6 , #5b9bd5)",
        padding: "3vh 1.5vw"
    },
    leftPane: {
        width: "43vw",
        display: "flex",
        flexDirection: "column",
    },
    rightPane: {
        width: "-webkit-fill-available"
    },
    simulateButtonDiv: {
        height: "100%",
        display: "flex"
    },
    simulateButton: {
        margin: "auto"
    },
    inputDiv: {
        height: 'calc(74vh - 106px)',
        padding: '10vh 10vw'
    },
    stepperButtons: {
        display: 'flex',
        height: "52px"
    }
});