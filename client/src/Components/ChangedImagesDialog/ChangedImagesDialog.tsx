import { Button, Dialog } from "@material-ui/core"
import { ChangedImage } from "shared-modules";
import { useSendSimulationToServer } from "../../ServerApiHooks/ServerApiHooks";
import { useAppSelector } from "../../Store/hooks";
import { CommonTable } from "../CommonTable/CommonTable"
import { ColumnDefinition } from "../CommonTable/ICommonTable";

export const ChangedImagesDialog = () => {
    const sendToServer = useSendSimulationToServer();
    const changedImages = useAppSelector((state) => state.changedFiles.changedFiles);

    const columnsDefinition: ColumnDefinition<ChangedImage>[] = [
        {
            text: 'Origin Path',
            field: 'originPath',
        },
        {
            text: 'New Path',
            field: 'newPath',
        }
    ];

    const getChangedImageId = (changeImage: ChangedImage) => {
        return changeImage.originPath;
    }

    const onApplySimulationClick = () => {
        sendToServer({ changedImages });
    }

    return <Dialog open>
        <CommonTable columnDefinitions={columnsDefinition}
            rows={changedImages}
            getKeyFromRow={getChangedImageId} />
        <Button onClick={onApplySimulationClick} />
    </Dialog>
}