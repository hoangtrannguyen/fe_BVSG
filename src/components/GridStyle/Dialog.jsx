import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { format, parse, isValid } from "date-fns";

import GridTitle from "./gridHead";
import GridValue from "./gridValue";
import FormRow from "./FormGrid";
const UserDialog = ({
  open,
  handleClose,
  handleChange,
  handleSwitchChange,
  newUser,
  initialUserFields,
  handleCreate,
  isEditMode,
  handleUpdate,
}) => {
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateFields = () => {
    const newErrors = {};
    initialUserFields.forEach((field) => {
      if (field.required && !newUser[field.name]) {
        newErrors[field.name] = `${field.label} là bắt buộc nhập`;
      } else if (
        field.name === "email" &&
        newUser.email &&
        !emailRegex.test(newUser.email)
      ) {
        newErrors.email = "Email không đúng định dạng";
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSnackbarMessage("Xin vui lòng điền đầy đủ thông tin");
      setOpenSnackbar(true);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateClick = () => {
    if (validateFields()) {
      handleCreate();
    }
  };

  const handleUpdateClick = () => {
    if (validateFields()) {
      handleUpdate(newUser.id, newUser);
    }
  };

  const handleCloseClick = () => {
    setErrors({});
    handleClose();
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const getFormattedDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      return isValid(date) ? format(date, "yyyy-MM-dd") : "";
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle color="#183c8c" bgcolor="#dce3f6" fontSize="bold">
        {isEditMode ? "Sửa đổi nhân viên" : "Tạo mới nhân viên"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" m={1} sx={{ color: "#183c8c" }}>
              Thông tin nhân viên - {newUser.code}
            </Typography>
          </Grid>
          {initialUserFields.map((field) => (
            <FormRow key={field.name}>
              <GridTitle required={field.required}>
                <Typography>{field.label}</Typography>
              </GridTitle>
              <GridValue>
                {field.type === "radio" ? (
                  <RadioGroup
                    row
                    name={field.name}
                    value={newUser[field.name]}
                    onChange={handleChange}
                  >
                    {field.options.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                ) : field.type === "switch" ? (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={newUser[field.name] === "Married"}
                        onChange={handleSwitchChange}
                        name={field.name}
                        color="primary"
                      />
                    }
                    label={
                      newUser[field.name] === "Married"
                        ? "Đã kết hôn"
                        : "Độc thân"
                    }
                  />
                ) : field.type === "textarea" ? (
                  <TextField
                    margin="dense"
                    name={field.name}
                    label={field.label}
                    value={newUser[field.name]}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                  />
                ) : (
                  <TextField
                    margin="dense"
                    name={field.name}
                    label={field.label}
                    type={field.type || "text"}
                    value={
                      field.name === "dateOfBirth" ||
                      field.name === "dateStartWork"
                        ? getFormattedDate(newUser[field.name])
                        : newUser[field.name]
                    }
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={
                      field.type === "date" ? { shrink: true } : {}
                    }
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                  />
                )}
              </GridValue>
            </FormRow>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: { xs: 10, sm: 5 },
            m: 3,
            mr: 7,
          }}
        >
          <Button onClick={handleCloseClick} variant="outlined" color="error">
            Hủy
          </Button>
          {isEditMode ? (
            <Button
              onClick={handleUpdateClick}
              variant="contained"
              color="primary"
            >
              Thay đổi
            </Button>
          ) : (
            <Button
              onClick={handleCreateClick}
              variant="contained"
              color="primary"
            >
              Tạo
            </Button>
          )}
        </Box>
      </DialogActions>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default UserDialog;
