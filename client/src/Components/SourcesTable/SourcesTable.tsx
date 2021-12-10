import { useState } from "react";
import { ColumnDefinition, CommonTable } from "../CommonTable/CommonTable";
import { useSourcesTableStyles } from "./SourcesTableStyles";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { AddSourceDialog } from "./AddSourceDialog/AddSourceDialog";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setSources } from "../../Store/Reducers/InputFilesReduer";
import { Source } from "../../../../shared_modules/Types";

export const getEmptySourceWithIndex = (index: number): Source => {
    return {
        index,
        folderLocation: "",
        imageNamePattern: "",
        datePattern: "",
        sequenceLength: 1
    }
}

export const SourcesTable = () => {
    const dispatch = useAppDispatch();

    const sources = useAppSelector((state) => state.inputFiles.sources);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [dialogSource, setDialogSource] = useState<Source>(getEmptySourceWithIndex(0));
    const [isEditDialog, setIsEditDialog] = useState(false);

    const classes = useSourcesTableStyles();

    const columnsDefinition: ColumnDefinition<Source>[] = [
        {
            text: 'Folder Location',
            field: 'folderLocation'
        },
        {
            text: 'Image Name Pattern',
            field: 'imageNamePattern'
        },
        {
            text: 'Date Pattern',
            field: 'datePattern'
        },
        {
            text: 'Sequence Length',
            field: 'sequenceLength'
        }
    ];

    const getSourceKey = (source: Source) => {
        return source.index.toString();
    }

    const onAddSourceClick = () => {
        setIsAddDialogOpen(true);
        setDialogSource(getEmptySourceWithIndex(sources.length));
        setIsEditDialog(false);
    }

    const onEditSourceClick = (source: Source) => {
        setIsAddDialogOpen(true);
        setDialogSource(source);
        setIsEditDialog(true);
    }

    const addSource = (source: Source) => {
        setIsAddDialogOpen(false);
        dispatch(setSources([...sources, source]));
    }

    const editSource = (source: Source) => {
        setIsAddDialogOpen(false);
        const newSources = [...sources.slice(0, source.index), source, ...sources.slice(source.index + 1)];
        dispatch(setSources(newSources))
    }

    const onDeleteSource = (source: Source) => {
        let sourcesAfterIndex = sources.slice(source.index + 1);
        // all indexes after selected index will be reduced by 1
        sourcesAfterIndex = sourcesAfterIndex.map(source => { return { ...source, index: source.index - 1 } });

        const newSources = [...sources.slice(0, source.index), ...sourcesAfterIndex];
        dispatch(setSources(newSources))
    }

    const onExitDialog = () => {
        setIsAddDialogOpen(false);
    }

    return <div className={classes.tableDiv} >
        <CommonTable columnDefinitions={columnsDefinition} rows={sources} getKeyFromRow={getSourceKey}
            onDeleteRow={onDeleteSource} onEditRow={onEditSourceClick} />
        <Fab color="primary" aria-label="add" onClick={onAddSourceClick}>
            <AddIcon />
        </Fab>
        {
            isAddDialogOpen &&
            <AddSourceDialog source={dialogSource} confirmSource={isEditDialog ? editSource : addSource} onBackDropClick={onExitDialog} />
        }
    </div>
}