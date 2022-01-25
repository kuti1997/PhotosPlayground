import { ColumnDefinition, CommonTable } from "../CommonTable/CommonTable";
import { useSourcesTableStyles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setSourceFolders } from "../../Store/Reducers/InputFilesReduer";
import { SourceFolder } from "shared-modules";
import { v4 as uuidv4 } from 'uuid';

export const SourceFolders = () => {
    const dispatch = useAppDispatch();

    const sourceFolders = useAppSelector((state) => state.inputFiles.sourceFolders);

    const classes = useSourcesTableStyles();

    const columnsDefinition: ColumnDefinition<SourceFolder>[] = [
        {
            text: 'Folder Path',
            field: 'path',
            isEditable: true
        }
    ];

    const getSourceId = (source: SourceFolder) => {
        return source.id;
    }

    const onEditSource = (sourceId: string, _: keyof SourceFolder, value: string) => {
        let sourceFolderIndex = sourceFolders.findIndex(sourceFolder => sourceFolder.id === sourceId);
        const newFolderSource = { id: sourceId, path: value };

        const newFolderSources = [
            ...sourceFolders.slice(0, sourceFolderIndex),
            newFolderSource,
            ...sourceFolders.slice(sourceFolderIndex + 1)
        ];

        dispatch(setSourceFolders(newFolderSources))
    }

    const onDeleteSource = (sourceId: string) => {
        const newSources = sourceFolders.filter(sourceFolder => sourceFolder.id !== sourceId);
        dispatch(setSourceFolders(newSources))
    }

    const onAddRow = (_: keyof SourceFolder, value: string) => {
        const newSources = [...sourceFolders, { id: uuidv4(), path: value }];
        dispatch(setSourceFolders(newSources))
    }

    return <div className={classes.tableDiv} >
        <CommonTable columnDefinitions={columnsDefinition} rows={sourceFolders} getKeyFromRow={getSourceId}
            onDeleteRow={onDeleteSource} onEditRow={onEditSource} onAddRow={onAddRow} />
    </div>
}