import React, { useEffect, useState } from "react";
import CrudPermissions from "./CRUDPermission";
import GridValue from "./gridValue";
import GridTitle from "./gridHead";
import FormRow from "./FormGrid";
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
import { format, isValid } from "date-fns";
import { FormControl, Select, MenuItem } from "@mui/material";

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

  const tables = ["EMP", "ACC"];

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const event = { target: { name: "roles", value: roles } };
    handleChange(event);
  }, [roles]);

  useEffect(() => {
    if (isEditMode) {
      setRoles(newUser.roles || []);
    }
  }, [newUser.roles, isEditMode]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateFields = () => {
    const newErrors = {};
    initialUserFields.forEach((field) => {
      if (
        isEditMode &&
        (field.name === "password" || field.name === "confirmPassword")
      ) {
        return;
      }
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

  const [selectedTable, setSelectedTable] = useState("");
  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
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
    return "";
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <DialogTitle color="#183c8c" bgcolor="#dce3f6">
        {isEditMode ? "Sửa đổi nhân viên" : "Tạo mới nhân viên"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" m={1} sx={{ color: "#183c8c" }}>
              Thông tin nhân viên - {newUser.code}
            </Typography>
          </Grid>
          {initialUserFields.map((field) => {
            if (
              (field.name === "password" || field.name === "confirmPassword") &&
              isEditMode
            )
              return null;
            return (
              <FormRow key={field.name}>
                <GridTitle required={field.required}>{field.label}</GridTitle>
                <GridValue>
                  {field.type === "roles" ? (
                    <>
                      <FormControl fullWidth>
                        <Select
                          value={selectedTable}
                          onChange={handleTableChange}
                        >
                          {tables.map((table) => (
                            <MenuItem value={table} key={table}>
                              {table}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {selectedTable && (
                        <CrudPermissions
                          tableName={selectedTable}
                          roles={roles}
                          setRoles={setRoles}
                        />
                      )}
                    </>
                  ) : field.type === "radio" ? (
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
                        field.name === "militaryTime" ||
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
            );
          })}
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
