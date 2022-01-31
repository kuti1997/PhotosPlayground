import { ThemeProvider } from '@material-ui/core/styles';
import { SourcePatterns } from '../Components/SourcePatterns/SourcePaterns';
import { useAppStyles } from './styles';
import { SourceFolders } from '../Components/SourceFolders/SourceFolders';
import TargetCard from '../Components/TargetCard/TargetCard';
import { useAppSelector } from '../Store/hooks';
import { ChangedImagesDialog } from '../Components/ChangedImagesDialog/ChangedImagesDialog';
import { useReceiveFromServer, useSendToServer } from '../ServerApiHooks/ServerApiHooks';
import { appTheme } from './theme';
import { IconButton } from '@material-ui/core';
import ForwardIcon from '@material-ui/icons/Forward';
import { getTargetPropertiesValid, SimulationInputError } from './utils';
import { GetSimulationRequest } from 'shared-modules';
import { useState } from 'react';
import { InvalidInputDialog } from '../Components/InvalidInputDialog/InvalidInputDialog';

function App() {
  const classes = useAppStyles();

  useReceiveFromServer();

  const changedImages = useAppSelector((state) => state.changedFiles.changedFiles);
  const targetProperties = useAppSelector((state) => state.inputFiles.targetProperties);
  const sourcePatterns = useAppSelector((state) => state.inputFiles.sourcePatterns);
  const sourceFolders = useAppSelector((state) => state.inputFiles.sourceFolders).map(sourceFolder => sourceFolder.path);

  const sendDataToServer = useSendToServer();

  const [targetError, setTargetError] = useState(SimulationInputError.NO_ERROR);

  const onClickSimulate = () => {
    const targetError = getTargetPropertiesValid(targetProperties);

    if (targetError === SimulationInputError.NO_ERROR) {
      const serverInput: GetSimulationRequest = { targetProperties, filePatterns: sourcePatterns, sourceFolderLocations: sourceFolders };
      sendDataToServer(serverInput);
    }
    else {
      setTargetError(targetError);
    }
  }

  const resetError = () => {
    setTargetError(SimulationInputError.NO_ERROR);
  }

  return (
    <ThemeProvider theme={appTheme}>
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

        {
          changedImages.length > 0 &&
          <ChangedImagesDialog />
        }

        {
          targetError !== SimulationInputError.NO_ERROR &&
          <InvalidInputDialog error={targetError} onClose={resetError}/>
        }

        <div className={classes.rightPane}>
          <SourcePatterns />
        </div>

      </div>
    </ThemeProvider>
  );
}

export default App;