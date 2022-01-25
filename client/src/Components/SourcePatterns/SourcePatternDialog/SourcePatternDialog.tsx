import { Button, Dialog, DialogTitle, TextField } from '@material-ui/core';
import { useState } from 'react';
import { SourcePattern } from 'shared-modules';
import { useAddSourceDialogStyles } from './styles';
import { convertCamelCaseToInitialCaps, getSortedDialogFields, isNamePatternValid } from './models';

interface SourcePatternDialogProps {
    sourcePattern: SourcePattern,
    onBackDropClick(): void,
    confirmSourcePattern(source: SourcePattern): void,
}

export const SourcePatternDialog = (props: SourcePatternDialogProps) => {
    const classes = useAddSourceDialogStyles();

    const [sourcePattern, setSourcePattern] = useState<SourcePattern>(props.sourcePattern);

    const fields = getSortedDialogFields(sourcePattern);

    const changeFieldValue = (value: string | number, field: keyof SourcePattern) => {
        setSourcePattern({ ...sourcePattern, [field]: value });
    }

    const confirmSourceClick = () => {
        props.confirmSourcePattern(sourcePattern);
    }

    return <Dialog open onClose={props.onBackDropClick}>
        <DialogTitle className={classes.dialogTitle}>
            Add New Source
        </DialogTitle>

        <div className={classes.dialogBody}>
            {
                fields.map(field => {
                    const label = convertCamelCaseToInitialCaps(field);
                    return <TextField key={field} value={sourcePattern[field]} label={label}
                        onChange={event => changeFieldValue(event.target.value, field)} />
                })
            }

            <TextField label="Sequence Length" type="number" value={sourcePattern.sequenceLength} InputLabelProps={{ shrink: true }}
                inputProps={{ min: 1, max: 8 }} onChange={event => changeFieldValue(Number(event.target.value), "sequenceLength")} />

            <Button onClick={confirmSourceClick} disabled={!isNamePatternValid(sourcePattern.namePattern)}>
                Confirm
            </Button>

            <Button onClick={props.onBackDropClick}>
                Cancel
            </Button>
        </div>
    </Dialog>
}