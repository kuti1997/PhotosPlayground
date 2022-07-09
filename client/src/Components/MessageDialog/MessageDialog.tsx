import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Message, STATUS } from 'shared-modules';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ErrorIcon from '@mui/icons-material/Error';

interface CustomizedDialogProps {
    message: Message,
    handleClose(): void
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
  }
  
  export default function CustomizedDialog({handleClose, message}: CustomizedDialogProps) {

  
    return (
      <div>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open
        >
          <DialogContent dividers>
            <Typography gutterBottom>
                {message.status === STATUS.SUCCESS ? 'Great Success' : `An error happened:\n${message.payload}`}
            </Typography>
            {message.status === STATUS.SUCCESS ? <ThumbUpIcon /> : <ErrorIcon />}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Ok
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    );
  }