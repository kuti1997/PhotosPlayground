import ForwardIcon from '@material-ui/icons/Forward';
import { IconButton } from '@material-ui/core';
import { useAppSelector } from '../../Store/hooks';
import { ServerInputFormat } from 'shared-modules';
import { useSentToServer } from '../../ServerApiHooks/useSendToServer';
import { useSimulationButtonStyles } from './styles';

export const SimulationButton = () => {
    const classes = useSimulationButtonStyles();

    const targetProperties = useAppSelector((state) => state.inputFiles.targetProperties);
    const sourcePatterns = useAppSelector((state) => state.inputFiles.sourcePatterns);
    const sourceFolders = useAppSelector((state) => state.inputFiles.sourceFolders).map(sourceFolder => sourceFolder.path);

    const sendDataToServer = useSentToServer();

    const onClickSimulate = () => {
        const serverInput: ServerInputFormat = { targetProperties, filePatterns: sourcePatterns, sourceFolderLocations: sourceFolders };
        sendDataToServer(serverInput);
    }

    return (
        <IconButton className={classes.simulateButton} onClick={onClickSimulate}>
            <ForwardIcon />
        </IconButton>
    );
}