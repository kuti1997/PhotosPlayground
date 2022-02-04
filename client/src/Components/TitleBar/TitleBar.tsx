import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Remove from '@mui/icons-material/Remove';
import classNames from 'classnames';
import { sendCloseMessage } from '../../ServerApiHooks/ServerApiHooks';
import { useTitleBarStyles } from './styles';

export const TitleBar = () => {
    const classes = useTitleBarStyles();

    const onClickClose = () => {
        sendCloseMessage();
    }

    return <div className={classes.row}>
        <div className={classNames(classes.closeButton, classes.iconWrapper)} onClick={onClickClose}>
            <CloseIcon className={classes.icon}/>
        </div>
        <div className={classes.iconWrapper}>
            <FullscreenIcon className={classes.icon}/>
        </div>
        <div className={classes.iconWrapper}>
            <Remove className={classes.icon}/>
        </div>
    </div>
}