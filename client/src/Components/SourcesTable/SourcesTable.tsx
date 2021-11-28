import { useState } from "react";
import { ColumnDefinition, CommonTable } from "../CommonTable/CommonTable";
import { useSourcesTableStyles } from "./SourcesTableStyles";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { AddSourceDialog } from "./AddSourceDialog/AddSourceDialog";

export interface Source {
    index: number,
    folderLocation: string,
    imageNamePattern: string,
    datePattern: string,
    sequenceLength: number
}

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
    const [sources, setSources] = useState<Source[]>([]);
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

    const fieldChanged = (row: Source, field: keyof Source, value: string) => {
        const newRow = { ...row, [field]: value };

        const newSources = [...sources.slice(0, row.index)];
        newSources.push(newRow);
        newSources.push(...sources.slice(row.index + 1));

        setSources(newSources);
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
        setSources([...sources, source]);
    }

    const editSource = (source: Source) => {
        setIsAddDialogOpen(false);
        const newSources = [...sources.slice(0, source.index), source, ...sources.slice(source.index + 1)];
        setSources(newSources);
    }

    const onDeleteSource = (source: Source) => {
        let sourcesAfterIndex = sources.slice(source.index + 1);
        // all indexes after selected index will be reduced by 1
        sourcesAfterIndex = sourcesAfterIndex.map(source => { return { ...source, index: source.index - 1 } });

        const newSources = [...sources.slice(0, source.index), ...sourcesAfterIndex];
        setSources(newSources);
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