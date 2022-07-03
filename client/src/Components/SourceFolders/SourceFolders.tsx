import { CommonTable } from "../CommonTable/CommonTable";
import { useSourcesTableStyles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setSourceFolders } from "../../Store/Reducers/InputFilesReduer";
import { SourceFolder } from "shared-modules";
import { ColumnDefinition } from "../CommonTable/ICommonTable";
import { useEffect, useRef } from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { v4 } from "uuid";

export const SourceFolders = () => {
    const dispatch = useAppDispatch();

    const sourceFolders = useAppSelector((state) => state.inputFiles.sourceFolders);

    const classes = useSourcesTableStyles();

    const inputFile = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (inputFile.current !== null) {
            inputFile.current.setAttribute("directory", "");
            inputFile.current.setAttribute("webkitdirectory", "");
        }
    }, [inputFile]);

    const columnsDefinition: ColumnDefinition<SourceFolder>[] = [
        {
            text: 'Folder Path',
            field: 'path'
        }
    ];

    const getSourceId = (source: SourceFolder) => {
        return source.id;
    }

    const onDeleteSource = (sourceId: string) => {
        const newSources = sourceFolders.filter(sourceFolder => sourceFolder.id !== sourceId);
        dispatch(setSourceFolders(newSources))
    }

    const onAddSourceClick = () => {
        inputFile.current?.click();
    }

    const onChangeFolder = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const { path } = event.target.files[0] as any
            const newFolderPath = path.slice(0, path.lastIndexOf('\\'));
            const newSources = [...sourceFolders, { id: v4(), path: newFolderPath }]
            dispatch(setSourceFolders(newSources))
        }
    }

    return <div className={classes.tableDiv} >
        <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={onChangeFolder} />
        <CommonTable columnDefinitions={columnsDefinition} rows={sourceFolders} getKeyFromRow={getSourceId}
            onDeleteRow={onDeleteSource}
            addButton={<Fab color="primary" aria-label="add" onClick={onAddSourceClick}>
                <AddIcon />
            </Fab>} />
    </div>
}