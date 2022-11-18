import { Close } from '@mui/icons-material';
import { IconButton, Snackbar } from '@mui/material';
import useNotification from '../common/hooks/useNotification';

const Notification = () => {
    const { notification, removeNotification } = useNotification();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        removeNotification();
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <Close fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <>
            <Snackbar
                open={notification ? true : false}
                autoHideDuration={6000}
                onClose={handleClose}
                message={notification?.message}
                action={action}
            />
        </>
    )
}

export default Notification;