import { TextField, Typography } from '@material-ui/core';
import { useStyles } from "./styles";
import { Target } from "shared-modules";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setTargetProperty } from "../../Store/Reducers/InputFilesReduer";
import React from 'react';

export default function TargetPropertiesCard() {
    const styleClasses = useStyles();

    const dispatch = useAppDispatch();

    const target = useAppSelector((state) => state.inputFiles.targetProperties);

    const fields = Object.keys(target).filter(key => key !== "sequenceLength").sort() as (keyof Target)[];

    const changeFieldValue = (value: string | number, field: keyof Target) => {
        dispatch(setTargetProperty({ field, value }));
    }

    return <div className={styleClasses.targetCard}>
        {
            fields.map(field => {
                const label = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
                return <React.Fragment key={field}>
                    <div className={styleClasses.targetProperty}>
                        <Typography className={styleClasses.whiteText}>{label}</Typography>
                        <TextField inputProps={{ className: styleClasses.innerInput }}
                            className={styleClasses.globalTextField}
                            onChange={event => changeFieldValue(event.target.value, field)}
                            value={target[field]}
                            variant="outlined" />
                    </div>
                </React.Fragment>
            })
        }
        
        <div className={styleClasses.targetProperty}>
            <Typography className={styleClasses.whiteText}>Sequence Length</Typography>
            <TextField inputProps={{ className: styleClasses.innerInput }}
                variant="outlined"
                className={styleClasses.globalTextField}
                value={target.sequenceLength}
                onChange={event => changeFieldValue(event.target.value, "sequenceLength")} />
        </div>
    </div>
}

