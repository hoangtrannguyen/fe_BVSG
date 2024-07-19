import React, { useState, useEffect } from "react";
import FetchData from "../../services/employee/crud";

import "./table.css";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TablePagination,
  Radio,
  FormControlLabel,
  Typography,
  RadioGroup,
  Switch,
  Pagination,
  PaginationItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const StyledTableCell = styled(TableCell)``;
const StyledTableContainer = styled(TableContainer)`
  background: #fdfdfd;
  border-radius: 12px;
  border: 2px solid #cecbcb;
`;
const StyledTable = styled(Table)`
  background: #fafbff;
  font-size: 16px;
  color: blue;
`;
const StyledTableHead = styled(TableHead)`
  background: #dce3f6;
  .MuiTableCell-head {
    color: #183c8c;
    font-weight: bold;
  }
`;
const StyledTableBody = styled(TableBody)`
  margin: 5px;
  background: #fdfdfd;
  & :hover {
    background-color: #f5f6f8;
  }
`;
const StyledTableRow = styled(TableRow)``;
const StyledTextField = styled(TextField)`
  background-color: white;
  width: 20rem;
  height: auto;
  padding: none;
  border-radius: 12px;
`;

function UserTable() {
  const {
    data,
    loading,
    error,
    total,
    fetchData,
    createUser,
    updateUser,
    deleteUser,
  } = FetchData();
  const [newUser, setNewUser] = useState({
    fullName: "",
    nameEnglish: "",
    citizenId: "",
    email: "",
    picture: "",
    dateStartWork: "",
    permanentAddresses: "",
    temporaryAddress: "",
    dateOfBirth: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    phoneOther: "",
    maritalStatus: "",
    militaryClass: "",
    militaryTime: "",
    license: "",
    contact: "",
    academicLevel: "",
    language: "",
    otherExpertise: "",
    familyStatus: "",
  });

  const [findUser, setFindUser] = useState({
    FullName: "",
    CitizenId: "",
    NameEnglish: "",
  });

  const handleFindChange = (e) => {
    setFindUser({ ...findUser, [e.target.name]: e.target.value });
  };

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    createUser(newUser);
    setNewUser({
      fullName: "",
      nameEnglish: "",
      citizenId: "",
      email: "",
      picture: "",
      dateStartWork: "",
      permanentAddresses: "",
      temporaryAddress: "",
      dateOfBirth: "",
      gender: "",
      bloodGroup: "",
      phone: "",
      phoneOther: "",
      maritalStatus: "",
      militaryClass: "",
      militaryTime: "",
      license: "",
      contact: "",
      academicLevel: "",
      language: "",
      otherExpertise: "",
      familyStatus: "",
    });
  };

  const handleFind = () => {
    fetchData(
      page,
      rowsPerPage,
      findUser.FullName,
      findUser.NameEnglish,
      findUser.CitizenId
    );
    setPage(1);
    setFindUser({
      FullName: "",
      CitizenId: "",
      NameEnglish: "",
    });
  };

  const handleDelete = (id) => {
    deleteUser(id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, fetchData]);

  const handleUpdate = (id) => {
    const updatedUser = prompt(
      "Enter new details in JSON format",
      JSON.stringify(data.find((user) => user.id === id))
    );
    if (updatedUser) {
      updateUser(id, JSON.parse(updatedUser));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };
  const handleSwitchChange = (event) => {
    handleChange({
      target: {
        name: event.target.name,
        value: event.target.checked ? "Married" : "Single",
      },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  //if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="searchArea">
        <div className="searchBar">
          <span> Search: </span>
          <div>
            <StyledTextField
              size="small"
              autoFocus
              name="FullName"
              label="Full Name"
              variant="filled"
              value={findUser.FullName}
              onChange={handleFindChange}
            />
          </div>
          <div>
            <StyledTextField
              size="small"
              name="NameEnglish"
              label="Name English"
              variant="filled"
              value={findUser.NameEnglish}
              onChange={handleFindChange}
            />
          </div>
          <div>
            <StyledTextField
              size="small"
              name="CitizenId"
              label="Citizen Id"
              variant="filled"
              value={findUser.CitizenId}
              onChange={handleFindChange}
            />
          </div>
        </div>
        <div className="btnSearch">
          <Button variant="contained" onClick={handleFind}>
            <SearchIcon />
          </Button>
        </div>
        <div>
          <Button variant="contained" onClick={() => handleClickOpen()}>
            <span>Add emloyee</span>
            <AddIcon />
          </Button>
          <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle>Create New User</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Personal Information</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    name="fullName"
                    label="Full Name"
                    value={newUser.fullName}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="nameEnglish"
                    label="Name in English"
                    value={newUser.nameEnglish}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="citizenId"
                    label="CCCD"
                    value={newUser.citizenId}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="email"
                    label="Email"
                    value={newUser.email}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Address Information</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="permanentAddresses"
                    label="Permanent Address"
                    value={newUser.permanentAddresses}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="temporaryAddress"
                    label="Temporary Address"
                    value={newUser.temporaryAddress}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Additional Information</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={newUser.dateOfBirth}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Gender</Typography>
                  <RadioGroup
                    row
                    label="Center"
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
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    name="phone"
                    label="Phone"
                    value={newUser.phone}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    name="phoneOther"
                    label="Other Phone"
                    value={newUser.phoneOther}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Blood Group</Typography>
                  <RadioGroup
                    row
                    label="Center"
                    name="bloodGroup"
                    value={newUser.bloodGroup}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="A" control={<Radio />} label="A" />
                    <FormControlLabel value="B" control={<Radio />} label="B" />
                    <FormControlLabel value="O" control={<Radio />} label="O" />
                    <FormControlLabel
                      value="AB"
                      control={<Radio />}
                      label="AB"
                    />
                    <FormControlLabel
                      value="Other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Marital Status</Typography>
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
                <Grid item xs={12}>
                  <Typography variant="h6">Professional Information</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    name="dateStartWork"
                    label="Start Work Date"
                    type="date"
                    value={newUser.dateStartWork}
                    onChange={handleChange}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    name="militaryClass"
                    label="Military Class"
                    value={newUser.militaryClass}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    name="license"
                    label="License"
                    value={newUser.license}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    margin="dense"
                    name="contact"
                    label="Primary Contact"
                    value={newUser.contact}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    name="academicLevel"
                    label="Academic Level"
                    value={newUser.academicLevel}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="dense"
                    name="language"
                    label="Language"
                    value={newUser.language}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>

      <StyledTableContainer>
        <StyledTable component={Paper}>
          <StyledTableHead>
            <StyledTableRow>
              <StyledTableCell>STT</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Language</StyledTableCell>
              <StyledTableCell>Option</StyledTableCell>
            </StyledTableRow>
          </StyledTableHead>
          <StyledTableBody>
            {data.map((user, index) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell>
                  {(page - 1) * rowsPerPage + index + 1}
                </StyledTableCell>
                <StyledTableCell>{user.fullName}</StyledTableCell>
                <StyledTableCell>{user.citizenId}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.gender}</StyledTableCell>
                <StyledTableCell>{user.phone}</StyledTableCell>
                <StyledTableCell>{user.language}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => handleUpdate(user.id)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </StyledTableBody>
        </StyledTable>
        <div className="pagination">
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            count={total}
            rowsPerPage={rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={({ from, to, count, page }) =>
              `Page ${page + 1} of ${Math.ceil(count / rowsPerPage)}`
            }
          />
          <Pagination
            count={Math.ceil(total / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
            className="custom-pagination"
          />
        </div>
      </StyledTableContainer>
    </>
  );
}

export default UserTable;
