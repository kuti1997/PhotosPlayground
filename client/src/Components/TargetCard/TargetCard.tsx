import { TextField, Typography } from '@material-ui/core';
import { useTargetCardStyles } from "./styles";
import { Target } from "shared-modules";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setTargetProperty } from "../../Store/Reducers/InputFilesReduer";
import React from 'react';

export default function TargetPropertiesCard() {
    const classes = useTargetCardStyles();

    const dispatch = useAppDispatch();

    const target = useAppSelector((state) => state.inputFiles.targetProperties);

    const fields = Object.keys(target).filter(key => key !== "sequenceLength").sort() as (keyof Target)[];

    const changeFieldValue = (value: string | number, field: keyof Target) => {
        dispatch(setTargetProperty({ field, value }));
    }

    return <div className={classes.targetCard}>
        <Typography className={`${classes.whiteText} ${classes.title}`}>Target Folder</Typography>
        {
            fields.map(field => {
                const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
                return <React.Fragment key={field}>
                    <div className={classes.targetProperty}>
                        <Typography className={classes.whiteText}>{label}</Typography>
                        <TextField inputProps={{ className: classes.innerInput }}
                            className={classes.globalTextField}
                            onChange={event => changeFieldValue(event.target.value, field)}
                            value={target[field]}
                            variant="outlined" />
                    </div>
                </React.Fragment>
            })
        }

        <div className={classes.targetProperty}>
            <Typography className={classes.whiteText}>Sequence Length</Typography>
            <TextField inputProps={{ className: classes.innerInput }}
                variant="outlined"
                className={classes.globalTextField}
                value={target.sequenceLength}
                onChange={event => changeFieldValue(event.target.value, "sequenceLength")} />
        </div>
    </div>
}

