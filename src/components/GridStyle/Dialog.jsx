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
    if (!newUser.fullName) newErrors.fullName = "Họ và tên là bắt buộc nhập";
    if (!newUser.citizenId) newErrors.citizenId = "CCCD là bắt buộc nhập";
    if (!newUser.phone) newErrors.phone = "Số điện thoại là bắt buộc nhập";
    if (!newUser.dateStartWork)
      newErrors.dateStartWork = "Ngày bắt đầu làm việc là bắt buộc nhập";
    if (newUser.email && !emailRegex.test(newUser.email)) {
      newErrors.email = "Email không đúng định dạng";
    }
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

  const handleUpdateClick = (newUser) => {
    if (validateFields()) {
      handleUpdate(newUser);
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
    const date = new Date(dateString);
    return isValid(date) ? format(date, "yyyy-MM-dd") : "";
  };

  console.log(newUser);
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

          {/* Họ và tên */}
          <FormRow>
            <GridTitle required>
              <Typography>Họ và tên</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                autoFocus
                margin="dense"
                name="fullName"
                label="Họ và tên"
                value={newUser.fullName}
                onChange={handleChange}
                fullWidth
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </GridValue>
          </FormRow>
          {/* <FormRow>
            <GridTitle>
              <Typography>Picture</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="pictureUrl"
                label="Picture URL"
                value={newUser.picture}
                onChange={handleChange}
                fullWidth
              />
              <Button variant="contained" component="label" sx={{ mt: 1 }}>
                Upload Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        handleChange({
                          target: {
                            name: "pictureUrl",
                            value: reader.result,
                          },
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
            </GridValue>
          </FormRow> */}

          {/* Tên tiếng anh */}
          <FormRow>
            <GridTitle>
              <Typography>Tên tiếng anh</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="nameEnglish"
                label="Tên tiếng anh"
                value={newUser.nameEnglish}
                onChange={handleChange}
                fullWidth
              />
            </GridValue>
          </FormRow>

          {/* CCCD */}
          <FormRow>
            <GridTitle required>
              <Typography>CCCD</Typography>
            </GridTitle>
            <GridValue>
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
            </GridValue>
          </FormRow>

          {/* Email */}
          <FormRow>
            <GridTitle>
              <Typography>Email:</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="email"
                label="Email"
                value={newUser.email}
                onChange={handleChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
              />
            </GridValue>
          </FormRow>

          {/* Địa chỉ thường trú */}
          <FormRow>
            <GridTitle>
              <Typography>Địa chỉ thường trú</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="permanentAddresses"
                label="Địa chỉ thường trú"
                value={newUser.permanentAddresses}
                onChange={handleChange}
                fullWidth
              />
            </GridValue>
          </FormRow>

          {/* Địa chỉ tạm trú */}
          <FormRow>
            <GridTitle>
              <Typography>Địa chỉ tạm trú</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="temporaryAddress"
                label="Địa chỉ tạm trú"
                value={newUser.temporaryAddress}
                onChange={handleChange}
                fullWidth
              />
            </GridValue>
          </FormRow>

          {/* Ngày sinh */}
          <FormRow>
            <GridTitle>
              <Typography>Ngày sinh</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="dateOfBirth"
                label="Ngày sinh"
                type="date"
                value={getFormattedDate(newUser.dateStartWork)}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              />
            </GridValue>
          </FormRow>

          {/* Giới tính */}
          <FormRow>
            <GridTitle>
              <Typography>Giới tính</Typography>
            </GridTitle>
            <GridValue>
              <RadioGroup
                row
                name="gender"
                value={newUser.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Nam"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Nữ"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Khác"
                />
              </RadioGroup>
            </GridValue>
          </FormRow>

          {/* Số điện thoại */}
          <FormRow>
            <GridTitle required>
              <Typography>Số điện thoại</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="phone"
                label="Số điện thoại"
                value={newUser.phone}
                onChange={handleChange}
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </GridValue>
          </FormRow>

          {/* Số điện thoại khác */}
          <FormRow>
            <GridTitle>
              <Typography>Số điện thoại khác</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="phoneOther"
                label="Số điện thoại khác"
                value={newUser.phoneOther}
                onChange={handleChange}
                fullWidth
              />
            </GridValue>
          </FormRow>

          {/* Nhóm máu */}
          <FormRow>
            <GridTitle>
              <Typography>Nhóm máu</Typography>
            </GridTitle>
            <GridValue>
              <RadioGroup
                row
                name="bloodGroup"
                value={newUser.bloodGroup.replace(/[+-]/, "")}
                onChange={(e) => {
                  const bloodGroup = e.target.value;
                  handleChange({
                    target: {
                      name: e.target.name,
                      value: bloodGroup,
                    },
                  });
                }}
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
            </GridValue>
          </FormRow>

          {/* Tình trạng hôn nhân */}
          <FormRow>
            <GridTitle>
              <Typography>Tình trạng hôn nhân</Typography>
            </GridTitle>
            <GridValue>
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
                  newUser.maritalStatus === "Married"
                    ? "Đã kết hôn"
                    : "Độc thân"
                }
              />
            </GridValue>
          </FormRow>

          {/* Ngày bắt đầu làm việc */}
          <FormRow>
            <GridTitle required>
              <Typography>Ngày bắt đầu làm việc</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="dateStartWork"
                label="Ngày bắt đầu làm việc"
                type="date"
                value={getFormattedDate(newUser.dateStartWork)}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateStartWork}
                helperText={errors.dateStartWork}
              />
            </GridValue>
          </FormRow>

          {/* Lớp nghĩa vụ quân sự */}
          <FormRow>
            <GridTitle>
              <Typography>Lớp nghĩa vụ</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="militaryClass"
                label="Lớp nghĩa vụ"
                value={newUser.militaryClass}
                onChange={handleChange}
                fullWidth
              />
            </GridValue>
          </FormRow>

          {/* Thời gian nghĩa vụ quân sự */}
          <FormRow>
            <GridTitle>
              <Typography>Thời gian nghĩa vụ</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="militaryTime"
                label="Thời gian nghĩa vụ"
                type="date"
                value={getFormattedDate(newUser.militaryTime)}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </GridValue>
          </FormRow>

          {/* Giấy phép */}
          <FormRow>
            <GridTitle>
              <Typography>Giấy phép lái xe</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="license"
                label="Giấy phép lái xe"
                value={newUser.license}
                onChange={handleChange}
                fullWidth
              />
            </GridValue>
          </FormRow>

          {/* Liên hệ chính */}
          <FormRow xs={12} sm={0}>
            <GridTitle sm={1}>
              <Typography>Liên hệ chính</Typography>
            </GridTitle>
            <GridValue sm={11}>
              <TextField
                margin="dense"
                name="contact"
                label="Liên hệ chính"
                value={newUser.contact}
                onChange={handleChange}
                fullWidth
              />
            </GridValue>
          </FormRow>

          {/* Trình độ học vấn */}

          {/* Trình độ học vấn */}
          <FormRow>
            <GridTitle>
              <Typography>Trình độ học vấn</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="academicLevel"
                label="Trình độ học vấn"
                value={newUser.academicLevel}
                onChange={handleChange}
                fullWidth
              />
            </GridValue>
          </FormRow>

          {/* Ngôn ngữ */}
          <FormRow>
            <GridTitle>
              <Typography>Ngôn ngữ</Typography>
            </GridTitle>
            <GridValue>
              <TextField
                margin="dense"
                name="language"
                label="Ngôn ngữ"
                value={newUser.language}
                onChange={handleChange}
                fullWidth
              />
            </GridValue>
          </FormRow>

          {/* Kinh nghiệm khác */}
          <FormRow xs={12} sm={0}>
            <GridTitle sm={1}>
              <Typography>Kinh nghiệm khác</Typography>
            </GridTitle>
            <GridValue sm={11}>
              <TextField
                margin="dense"
                name="otherExpertise"
                label="Kinh nghiệm khác"
                value={newUser.otherExpertise}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </GridValue>
          </FormRow>

          {/* Tình trạng gia đình */}
          <FormRow xs={12} sm={0}>
            <GridTitle sm={1}>
              <Typography>Tình trạng gia đình</Typography>
            </GridTitle>
            <GridValue sm={11}>
              <TextField
                margin="dense"
                name="familyStatus"
                label="Tình trạng gia đình"
                value={newUser.familyStatus}
                onChange={handleChange}
                fullWidth
              />
            </GridValue>
          </FormRow>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: {
              xs: 10, // Khoảng cách cho xs
              sm: 5, // Khoảng cách cho sm
            },
            m: 3,
            mr: 7,
          }}
        >
          <Button onClick={handleCloseClick} variant="outlined" color="error">
            Hủy
          </Button>

          {isEditMode ? (
            <Button
              onClick={() => handleUpdateClick(newUser.id)}
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
