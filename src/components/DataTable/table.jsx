import React, { useState, useEffect } from "react";
import FetchData from "../../services/employee/crud";
import UserDialog from "../Dialog";
import "./table.css";
import styled from "styled-components";
import { format } from "date-fns";
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
  Grid,
  TablePagination,
  Typography,
  Pagination,
  Card,
  CardContent,
  CardActions,
  Box,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

const StyledTableCell = styled(TableCell)``;

const StyledTableRow = styled(TableRow)``;

const StyledCard = styled(Card)`
  display: block;
  margin-bottom: 15px;
  margin-top: 15px;
`;

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

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = (user) => {
    setNewUser(user);
    setIsEditMode(true);
    setOpen(true);
  };

  const [findUser, setFindUser] = useState({
    FullName: "",
    CitizenId: "",
    NameEnglish: "",
  });

  const handleFindChange = (e) => {
    setFindUser({ ...findUser, [e.target.name]: e.target.value });
  };
  const isSmallScreen = useMediaQuery("(max-width: 900px)");

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
    setOpen(false);
  };

  const handleUpdate = (id) => {
    updateUser(id, newUser);
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
    setIsEditMode(false);
    setOpen(false);
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

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, fetchData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>
        <Box
          className="searchArea"
          sx={{
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          <Box
            className="searchBar"
            sx={{
              flexDirection: isSmallScreen ? "column" : "row",
              gap: isSmallScreen ? "1rem" : "3rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{ display: isSmallScreen ? "none" : "default" }}
            >
              Search:
            </Typography>
            <TextField
              size="small"
              autoFocus
              name="FullName"
              label="Full Name"
              variant="filled"
              value={findUser.FullName}
              onChange={handleFindChange}
              fullWidth
            />
            <TextField
              size="small"
              name="NameEnglish"
              label="Name English"
              variant="filled"
              value={findUser.NameEnglish}
              onChange={handleFindChange}
              fullWidth
            />
            <TextField
              size="small"
              name="CitizenId"
              label="Citizen Id"
              variant="filled"
              value={findUser.CitizenId}
              onChange={handleFindChange}
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              gap: isSmallScreen ? "1rem" : "1.5rem",
              justifyContent: isSmallScreen ? "center" : "flex-start",
              width: "fit-content",
              marginRight: "1rem",
            }}
          >
            <Button variant="contained" onClick={handleFind}>
              <SearchIcon />
            </Button>
            <IconButton
              variant="contained"
              onClick={handleClickOpen}
              color="primary"
            >
              <AddIcon />
              <Typography>Add employee</Typography>
            </IconButton>
          </Box>
          <UserDialog
            open={open}
            handleClose={handleClose}
            handleChange={handleChange}
            handleSwitchChange={handleSwitchChange}
            newUser={newUser}
            handleCreate={handleCreate}
            isEditMode={isEditMode}
            handleUpdate={handleUpdate}
          />
        </Box>
      </div>

      {isSmallScreen ? (
        <>
          {data.map((user, index) => (
            <StyledCard key={user.id} variant="outlined">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "5px",
                  marginBottom: "-8px",
                  width: "auto",
                }}
              >
                <CardActions sx={{ padding: "0" }}>
                  <IconButton
                    onClick={() => handleEdit(user)}
                    color="primary"
                    sx={{
                      fontSize: ".5rem",
                      padding: "0",
                      paddingRight: "5px",
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(user.id)}
                    color="error"
                    sx={{
                      fontSize: ".5rem",
                      padding: "0",
                      paddingRight: "10px",
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Box>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                      Full Name:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">{user.fullName}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                      Citizen Id:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">{user.citizenId}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                      Phone:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">{user.phone}</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                      Email:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="body1"
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                    >
                      {user.email}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          ))}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil(total / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </>
      ) : (
        <StyledTableContainer>
          <StyledTable component={Paper}>
            <StyledTableHead>
              <StyledTableRow>
                <StyledTableCell>STT</StyledTableCell>

                <StyledTableCell>Mã nhân viên</StyledTableCell>
                <StyledTableCell>Ngày bắt đầu</StyledTableCell>
                <StyledTableCell>Họ và tên</StyledTableCell>
                <StyledTableCell>CCCD</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Giới tính</StyledTableCell>
                <StyledTableCell>Điện thoại</StyledTableCell>
                <StyledTableCell>Ngôn ngữ</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            </StyledTableHead>
            <StyledTableBody component={Paper}>
              {data.map((user, index) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell>
                    {(page - 1) * rowsPerPage + index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{user.code}</StyledTableCell>
                  <StyledTableCell>
                    {format(new Date(user.date), "dd/MM/yyyy")}
                  </StyledTableCell>
                  <StyledTableCell>{user.fullName}</StyledTableCell>
                  <StyledTableCell>{user.citizenId}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{user.gender}</StyledTableCell>
                  <StyledTableCell>{user.phone}</StyledTableCell>
                  <StyledTableCell>{user.language}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      onClick={() => handleEdit(user)}
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
              ActionsComponent={() => null}
              sx={{ position: "sticky", bottom: 0 }}
            />
            <Pagination
              count={Math.ceil(total / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              showFirstButton
              showLastButton
              className="custom-pagination"
              sx={{ position: "sticky", bottom: 0 }}
            />
          </div>
        </StyledTableContainer>
      )}
    </>
  );
}

export default UserTable;
