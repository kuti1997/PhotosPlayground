import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Remove from '@mui/icons-material/Remove';
import classNames from 'classnames';
import { sendCloseMessage, sendMinimizeMessage } from '../../ServerApiHooks/ServerApiHooks';
import { useTitleBarStyles } from './styles';

export const TitleBar = () => {
    const classes = useTitleBarStyles();

    const onClickClose = () => {
        sendCloseMessage();
    }

    const onClickMinimize = () => {
        sendMinimizeMessage();
    }

    return <div className={classes.row}>
        <div className={classes.draggableSpace}>
        </div>
        <div className={classes.icons}>
            <div className={classNames(classes.closeButton, classes.iconWrapper)} onClick={onClickClose}>
                <CloseIcon className={classes.icon} />
            </div>
            <div className={classNames(classes.notCloseButtonHover, classes.iconWrapper)}>
                <FullscreenIcon className={classes.icon} />
            </div>
            <div className={classNames(classes.notCloseButtonHover, classes.iconWrapper)} onClick={onClickMinimize}>
                <Remove className={classes.icon} />
            </div>
        </div>
    </div>
}