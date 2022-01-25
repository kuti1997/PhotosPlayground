import { Dialog } from "@material-ui/core"
import { useAppSelector } from "../../Store/hooks";
import { ColumnDefinition, CommonTable } from "../CommonTable/CommonTable"

interface ChangedImage {
    originPath: string,
    newPath: string
}

export const ChangedImagesDialog = () => {
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

    const changedImages = useAppSelector((state) => state.changedFiles.changedFiles);

    const getChangedImageId = (changeImage: ChangedImage) => {
        return changeImage.originPath;
    }

    return <Dialog open>
        <CommonTable columnDefinitions={columnsDefinition}
            rows={changedImages}
            getKeyFromRow={getChangedImageId} />
    </Dialog>
}