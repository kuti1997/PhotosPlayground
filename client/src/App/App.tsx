import { ThemeProvider } from '@material-ui/core/styles';
import { SourcePatterns } from '../Components/SourcePatterns/SourcePaterns';
import { useAppStyles } from './styles';
import { SourceFolders } from '../Components/SourceFolders/SourceFolders';
import TargetCard from '../Components/TargetCard/TargetCard';
import { useAppSelector } from '../Store/hooks';
import { ChangedImagesDialog } from '../Components/ChangedImagesDialog/ChangedImagesDialog';
import { useReceiveFromServer, useSendToServer } from '../ServerApiHooks/ServerApiHooks';
import { appTheme } from './theme';
import { Box, Button, IconButton, Step, StepLabel, Stepper } from '@mui/material';
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

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: 'Select Input Folders', component: <SourceFolders />
    },
    {
      label: 'Select Input Patters', component: <SourcePatterns />
    },
    {
      label: 'Select Target Folder', component: <TargetCard />
    }
  ];

  const back = () => {
    setActiveStep(activeStep - 1)
  }

  const next = () => {
    setActiveStep(activeStep + 1);
  }

  return (
    <ThemeProvider theme={appTheme}>
      <div className={classes.app}>
        <Stepper activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={step.label} completed={false} onClick={() => { setActiveStep(index) }}>
                <StepLabel >{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className={classes.inputDiv}>
          {
            steps[activeStep].component
          }

        </div>

        <div className={classes.stepperButtons}>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

            <Button style={{ color: 'black' }} onClick={back} sx={{ mr: 1 }}
              disabled={activeStep === 0}>
              Back
            </Button>

            <Button style={{ color: 'black' }} sx={{ mr: 1 }} onClick={next}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;