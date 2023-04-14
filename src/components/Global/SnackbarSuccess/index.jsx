import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarSuccess = ({
  openSnackbar,
  handleCloseSnackbar,
  snackBarMessage,
}) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity="success"
        sx={{ width: "100%" }}
      >
        {snackBarMessage}
      </Alert>
    </Snackbar>
  );
};
