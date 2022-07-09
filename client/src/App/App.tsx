import { ThemeProvider } from '@material-ui/core/styles';
import { SourcePatterns } from '../Components/SourcePatterns/SourcePaterns';
import { useAppStyles } from './styles';
import { SourceFolders } from '../Components/SourceFolders/SourceFolders';
import TargetCard from '../Components/TargetCard/TargetCard';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { useReceiveFromServer, sendGetImageSortSimulation, sendGetImageGroupSimulation } from '../ServerApiHooks/ServerApiHooks';
import { appTheme } from './theme';
import { Box, Button, Dialog, Step, StepLabel, Stepper } from '@mui/material';
import { GetSimulationRequest, Message, STATUS } from 'shared-modules';
import { useState } from 'react';
import { SelectMode } from '../Components/SelectMode/SelectMode';
import { setChangedFiles } from '../Store/Reducers/ChangedFilesReducer';
import { Mode } from '../Store/Reducers/ModeReducer';
import CustomizedDialog from '../Components/MessageDialog/MessageDialog';

function App() {
  const [message, setMessage] = useState<Message | null>(null)
  const classes = useAppStyles();

  const dispatch = useAppDispatch();

  const targetProperties = useAppSelector((state) => state.inputFiles.targetProperties);
  const sourcePatterns = useAppSelector((state) => state.inputFiles.sourcePatterns);
  const sourceFolders = useAppSelector((state) => state.inputFiles.sourceFolders).map(sourceFolder => sourceFolder.path);
  const mode = useAppSelector((state) => state.mode.mode);

  const getServerSimulation = (data: Message) => {
    setMessage(data)
  }

  useReceiveFromServer(getServerSimulation);

  const simulate = () => {
    const serverInput: GetSimulationRequest = { targetProperties, filePatterns: sourcePatterns, sourceFolderLocations: sourceFolders };

    if (mode === Mode.IMAGE_SORT) {
      sendGetImageSortSimulation(serverInput);
    }
    else {
      sendGetImageGroupSimulation(serverInput);
    }
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
    if (activeStep === steps.length - 1) {
      simulate();
    }
    else {
      setActiveStep(activeStep + 1);
    }
  }

  return (
    <ThemeProvider theme={appTheme}>
      {
        message &&
        <CustomizedDialog message={message} handleClose={() => setMessage(null)}/>
      }
      <div className={classes.app}>
        <SelectMode />
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