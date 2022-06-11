import { makeStyles } from '@mui/styles';

export const useSelectModeStyles = makeStyles({
    switch: {
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: '#aab4be !important',
            borderRadius: 20 / 2,
        }
    }
});