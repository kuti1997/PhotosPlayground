import { useState } from "react";
import { CommonTable } from "../CommonTable/CommonTable";
import { useSourcesTableStyles } from "./styles";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { SourcePatternDialog } from "./SourcePatternDialog/SourcePatternDialog";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setSourcePatterns } from "../../Store/Reducers/InputFilesReduer";
import { SourcePattern } from "shared-modules";
import { v4 as uuidv4 } from 'uuid';
import { ColumnDefinition } from "../CommonTable/ICommonTable";

export const getEmptySource = (): SourcePattern => {
    return {
        id: uuidv4(),
        namePattern: "",
        datePattern: "",
        sequenceLength: 1
    }
}

export const SourcePatterns = () => {
    const dispatch = useAppDispatch();

    const sourcePatterns = useAppSelector((state) => state.inputFiles.sourcePatterns);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogSource, setDialogSource] = useState<SourcePattern>(getEmptySource());
    const [isEditDialog, setIsEditDialog] = useState(false);

    const classes = useSourcesTableStyles();

    const columnsDefinition: ColumnDefinition<SourcePattern>[] = [
        {
            text: 'Name Pattern',
            field: 'namePattern'
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

    const getSourceId = (source: SourcePattern) => {
        return source.id;
    }

    const onAddSourceClick = () => {
        setIsDialogOpen(true);
        setDialogSource(getEmptySource());
        setIsEditDialog(false);
    }

    const onEditSourceClick = (source: SourcePattern) => {
        setIsDialogOpen(true);
        setDialogSource(source);
        setIsEditDialog(true);
    }

    const addSource = (source: SourcePattern) => {
        setIsDialogOpen(false);
        dispatch(setSourcePatterns([...sourcePatterns, source]));
    }

    const editSource = (source: SourcePattern) => {
        setIsDialogOpen(false);
        const sourceIndex = sourcePatterns.findIndex(filteringSource => filteringSource.id === source.id);

        const newSources = [
            ...sourcePatterns.slice(0, sourceIndex),
            source,
            ...sourcePatterns.slice(sourceIndex + 1)
        ];

        dispatch(setSourcePatterns(newSources))
    }

    const onDeleteSource = (sourceId: string) => {
        const newSources = sourcePatterns.filter(filteringSource => filteringSource.id !== sourceId);
        dispatch(setSourcePatterns(newSources))
    }

    const onExitDialog = () => {
        setIsDialogOpen(false);
    }

    return <div className={classes.tableDiv} >
        <CommonTable columnDefinitions={columnsDefinition} rows={sourcePatterns} getKeyFromRow={getSourceId}
            onDeleteRow={onDeleteSource} onClickEdit={onEditSourceClick}
            addButton={<Fab color="primary" aria-label="add" onClick={onAddSourceClick} className={classes.addButton}>
                <AddIcon />
            </Fab>}
        />

        {
            isDialogOpen &&
            <SourcePatternDialog sourcePattern={dialogSource} confirmSourcePattern={isEditDialog ? editSource : addSource}
                onBackDropClick={onExitDialog} />
        }
    </div>
}