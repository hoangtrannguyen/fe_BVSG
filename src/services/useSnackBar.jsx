import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export function useSnackBar() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const SnackbarComponent = (
    <Snackbar
      open={openSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );

  return { SnackbarComponent, showSnackbar };
}
