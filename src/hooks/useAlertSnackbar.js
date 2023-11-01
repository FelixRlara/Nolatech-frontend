"use client"

import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const useAlertSnackbar = () => {
    const [open, setOpen] = React.useState(false);
    const [alertProps, setAlertProps] = React.useState(null);

    const alert = ({ message, description, type = "success" }) => {
        setAlertProps(props => ({
            ...props,
            message,
            description,
            type
        }));

        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setAlertProps(null);
    }

    const SnackbarComponent = React.useCallback(
        () => (
            <React.Fragment>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={alertProps?.type}
                        sx={{ width: '100%' }}
                    >
                        {alertProps?.message}
                    </Alert>
                </Snackbar>
            </React.Fragment>
        ),
        [alertProps, open]
    )

    return [alert, SnackbarComponent];

}

export default useAlertSnackbar;