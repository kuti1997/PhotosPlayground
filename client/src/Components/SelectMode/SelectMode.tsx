import Switch from '@mui/material/Switch';
import { FormControlLabel } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { Mode, setMode } from "../../Store/Reducers/ModeReducer";
import { useSelectModeStyles } from './styles';

export const SelectMode = () => {
    const mode = useAppSelector(state => state.mode.mode);
    const dispatch = useAppDispatch();

    const onClickSwitch = (_: any, checked: boolean) => {
        dispatch(setMode(checked ? Mode.IMAGE_SORT : Mode.IMAGE_GROUP));
    }

    const classes = useSelectModeStyles();
    
    return <div>
        <FormControlLabel
            control={<Switch className={classes.switch} onChange={onClickSwitch} checked={mode === Mode.IMAGE_SORT} name={mode} />}
            label={mode} />
    </div>
}