import TargetPropertiesCard from '../Components/TargetPropertiesCard/TargetPropertiesCard';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { SourcesTable } from '../Components/SourcesTable/SourcesTable';
import { useAppStyles } from './AppStyles';
import ForwardIcon from '@material-ui/icons/Forward';
import { IconButton } from '@material-ui/core';
import { ChangedFilesList } from '../Components/ChangedFilesList/ChangedFilesList';
import { useAppSelector } from '../Store/hooks';

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
    },
  }
});

function App() {
  const classes = useAppStyles();

  const target = useAppSelector((state) => state.inputFiles.targetProperties);

  const onClickSimulate = () => {
    (window as any).api.send("toMain", target);
  }

  (window as any).api.receive("fromMain", (data: string) => {
    console.log(`Received ${data} from main process`);
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>

        <div className={classes.leftPane}>
          <TargetPropertiesCard />
          <SourcesTable />
        </div>

        <div className={classes.simulateButtonDiv}>
          <IconButton className={classes.simulateButton} onClick={onClickSimulate}>
            <ForwardIcon />
          </IconButton>
        </div>

        <ChangedFilesList />

      </div>
    </ThemeProvider>
  );
}

export default App;