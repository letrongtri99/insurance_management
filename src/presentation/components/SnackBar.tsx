// components/Snackbar.tsx or whatever you wanna call it
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import * as CONSTANTS from 'shared/constants';
import { hideSnackBar } from '../redux/actions/ui';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function SnackbarComponent() {
  const dispatch = useDispatch();

  const { isSnackbarOpen, snackbarMessage, snackBarStatus, isNotClose } =
    useSelector((state: any) => state.uiInitReducer);

  function handleClose() {
    dispatch(hideSnackBar());
  }

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={isNotClose ? null : CONSTANTS.snackBarConfig.duration}
      onClose={handleClose}
      style={{ whiteSpace: 'pre-line' }}
    >
      <Alert
        onClose={handleClose}
        severity={snackBarStatus}
        className="cypress-alert"
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
