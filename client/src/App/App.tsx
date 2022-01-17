import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { SourcePatterns } from '../Components/SourcePatterns/SourcePaterns';
import { useAppStyles } from './AppStyles';
import ForwardIcon from '@material-ui/icons/Forward';
import { IconButton } from '@material-ui/core';
import { ChangedFilesList } from '../Components/ChangedFilesList/ChangedFilesList';
import { useAppSelector } from '../Store/hooks';
import { SourceFolders } from '../Components/SourceFolders/SourceFolders';
import TargetCard from '../Components/TargetCard/TargetCard';

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

  const targetProperties = useAppSelector((state) => state.inputFiles.targetProperties);
  const sourcePatterns = useAppSelector((state) => state.inputFiles.sourcePatterns).map(sourcePattern => {
    return {
      namePattern: sourcePattern.namePattern,
      datePattern: sourcePattern.datePattern,
      sequenceLength: sourcePattern.sequenceLength
    }
  });
  const sourceFolders = useAppSelector((state) => state.inputFiles.sourceFolders).map(sourceFolder => sourceFolder.path);

  const onClickSimulate = () => {
    (window as any).api.send("toMain", { targetProperties, filePatterns: sourcePatterns, sourceFolderLocations: sourceFolders });
  }

  (window as any).api.receive("fromMain", (data: string) => {
    console.log(`Received ${data} from main process`);
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>

        <div className={classes.leftPane}>
          <TargetCard />
          <SourceFolders />
        </div>

        <div className={classes.simulateButtonDiv}>
          <IconButton className={classes.simulateButton} onClick={onClickSimulate}>
            <ForwardIcon />
          </IconButton>
        </div>

        <div className={classes.rightPane}>
          <SourcePatterns />
        </div>

      </div>
    </ThemeProvider>
  );
}

export default App;