import { Button, Dialog, DialogTitle, TextField } from '@material-ui/core';
import { useState } from 'react';
import { Source } from 'shared-modules';
import { useAddSourceDialogStyles } from './AddSourceDialogStyles';

interface NewSourceDialogProps {
    source: Source,
    onBackDropClick(): void,
    confirmSource(source: Source): void,
}

export const AddSourceDialog = (props: NewSourceDialogProps) => {
    const classes = useAddSourceDialogStyles();

    const [source, setSource] = useState<Source>(props.source);

    const isSourceValid = () => {
        const { folderLocation, imageNamePattern, datePattern } = source;

        if (!folderLocation) return false;
        if (!imageNamePattern.includes("{date}") && !imageNamePattern.includes("{sequence}")) return false;
        return true;
    }

    const fields = Object.keys(source).filter(key => key !== "index" && key !== "sequenceLength").sort() as (keyof Source)[];

    const changeFieldValue = (value: string | number, field: keyof Source) => {
        setSource({ ...source, [field]: value });
    }

    const confirmSourceClick = () => {
        props.confirmSource(source);
    }

    return <Dialog open onClose={props.onBackDropClick}>
        <DialogTitle className={classes.dialogTitle}>
            Add New Source
        </DialogTitle>

        <div className={classes.dialogBody}>
            {
                fields.map(field => {
                    const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
                    return <TextField key={field} value={source[field]} label={label}
                        onChange={event => changeFieldValue(event.target.value, field)} />
                })
            }

            <TextField label="Sequence Length" type="number" value={source.sequenceLength} InputLabelProps={{ shrink: true }}
                inputProps={{ min: 1, max: 8 }} onChange={event => changeFieldValue(Number(event.target.value), "sequenceLength")} />

            <Button onClick={confirmSourceClick} disabled={!isSourceValid()}>
                Confirm
            </Button>
            <Button onClick={props.onBackDropClick}>
                Cancel
            </Button>
        </div>
    </Dialog>
}