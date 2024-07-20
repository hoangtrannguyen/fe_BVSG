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
} from "@mui/material";

const UserDialog = ({
  open,
  handleClose,
  handleChange,
  handleSwitchChange,
  newUser,
  handleCreate,
  isEditMode,
  handleUpdate,
}) => {
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!newUser.fullName) newErrors.fullName = "Full Name is required";
    if (!newUser.citizenId) newErrors.citizenId = "CCCD is required";
    if (!newUser.phone) newErrors.phone = "Phone is required";
    if (!newUser.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateClick = () => {
    if (validateFields()) {
      handleCreate();
    }
  };

  const handleCloseClick = () => {
    setErrors({});
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle color="#183c8c" bgcolor="#dce3f6" fontSize="bold">
        {isEditMode ? "Edit User" : "Create New User"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" m={1} sx={{ color: "#183c8c" }}>
              Personal Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              alignItems="right"
              spacing={1}
              direction={{ xs: "column", sm: "row" }}
            >
              <Grid item xs={4} sm={2}>
                <Typography>
                  Full Name{" "}
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="fullName"
                  label="Full Name"
                  value={newUser.fullName}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Name in English:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="nameEnglish"
                  label="Name in English"
                  value={newUser.nameEnglish}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>
                  CCCD{" "}
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="citizenId"
                  label="CCCD"
                  value={newUser.citizenId}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.citizenId}
                  helperText={errors.citizenId}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Email:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="email"
                  label="Email"
                  value={newUser.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" m={1} sx={{ color: "#183c8c" }}>
              Address Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Permanent Address:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="permanentAddresses"
                  label="Permanent Address"
                  value={newUser.permanentAddresses}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Temporary Address:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="temporaryAddress"
                  label="Temporary Address"
                  value={newUser.temporaryAddress}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" m={1} sx={{ color: "#183c8c" }}>
              Additional Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>
                  Date of Birth{" "}
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  value={newUser.dateOfBirth}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Gender:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <RadioGroup
                  row
                  name="gender"
                  value={newUser.gender}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>
                  Phone{" "}
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="phone"
                  label="Phone"
                  value={newUser.phone}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Other Phone:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="phoneOther"
                  label="Other Phone"
                  value={newUser.phoneOther}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Blood Group:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <RadioGroup
                  row
                  name="bloodGroup"
                  value={newUser.bloodGroup}
                  onChange={handleChange}
                >
                  <FormControlLabel value="A" control={<Radio />} label="A" />
                  <FormControlLabel value="B" control={<Radio />} label="B" />
                  <FormControlLabel value="O" control={<Radio />} label="O" />
                  <FormControlLabel value="AB" control={<Radio />} label="AB" />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Marital Status:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newUser.maritalStatus === "Married"}
                      onChange={handleSwitchChange}
                      name="maritalStatus"
                      color="primary"
                    />
                  }
                  label={
                    newUser.maritalStatus === "Married" ? "Married" : "Single"
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>
                  Start Work Date{" "}
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="dateStartWork"
                  label="Start Work Date"
                  type="date"
                  value={newUser.dateStartWork}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dateStartWork}
                  helperText={errors.dateStartWork}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Military Class:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="militaryClass"
                  label="Military Class"
                  value={newUser.militaryClass}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Military Time:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="militaryTime"
                  label="Military Time"
                  type="date"
                  value={newUser.militaryTime}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>License:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="license"
                  label="License"
                  value={newUser.license}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={1}>
                <Typography>Primary Contact:</Typography>
              </Grid>
              <Grid item xs={8} sm={11}>
                <TextField
                  margin="dense"
                  name="contact"
                  label="Primary Contact"
                  value={newUser.contact}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Academic Level:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="academicLevel"
                  label="Academic Level"
                  value={newUser.academicLevel}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={2}>
                <Typography>Language:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <TextField
                  margin="dense"
                  name="language"
                  label="Language"
                  value={newUser.language}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={1}>
                <Typography>Other Expertise:</Typography>
              </Grid>
              <Grid item xs={8} sm={11}>
                <TextField
                  margin="dense"
                  name="otherExpertise"
                  label="Other Expertise"
                  value={newUser.otherExpertise}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={4} sm={1}>
                <Typography>Family Status:</Typography>
              </Grid>
              <Grid item xs={8} sm={11}>
                <TextField
                  margin="dense"
                  name="familyStatus"
                  label="Family Status"
                  value={newUser.familyStatus}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseClick}>Cancel</Button>
        {isEditMode ? (
          <Button onClick={() => handleUpdate(newUser.id)}>Update</Button>
        ) : (
          <Button onClick={handleCreateClick}>Create</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
