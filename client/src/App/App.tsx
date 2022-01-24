import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { SourcePatterns } from '../Components/SourcePatterns/SourcePaterns';
import { useAppStyles } from './AppStyles';
import { SourceFolders } from '../Components/SourceFolders/SourceFolders';
import TargetCard from '../Components/TargetCard/TargetCard';
import { SimulationButton } from '../Components/SimulationButton/SimulationButton';
import { useReceiveFromServer } from '../ServerApiHooks/useReceiveFromServer';

const theme = createTheme({
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

function App() {
  const classes = useAppStyles();

  useReceiveFromServer();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>

        <div className={classes.leftPane}>
          <TargetCard />
          <SourceFolders />
        </div>

        <div className={classes.simulateButtonDiv}>
          <SimulationButton />
        </div>

        <div className={classes.rightPane}>
          <SourcePatterns />
        </div>

      </div>
    </ThemeProvider>
  );
}

export default App;