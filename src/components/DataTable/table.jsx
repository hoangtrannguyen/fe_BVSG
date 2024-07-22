import React, { useState, useEffect } from "react";
import FetchData from "../../services/employee/crud";
import "./table.css";
import styled from "styled-components";
import SearchAndActions from "./SearchBar";
import UserCard from "./UserCard";
import UserTableHead from "./UserTableHead";
import UserTableBody from "./UserTableBody";
import UserTablePagination from "./UserTablePagination";
import {
  Table,
  TableContainer,
  Paper,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const StyledTableContainer = styled(TableContainer)`
  background: #fdfdfd;
  border-radius: 12px;
  border: 2px solid #cecbcb;
`;

function UserTable() {
  const {
    data,
    total,
    fetchData,
    createUser,
    updateUser,
    deleteUser,
    findById,
    userDetail,
    SnackbarComponent,
  } = FetchData();

  const [openF, setOpenF] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleClickOpenF = (user) => {
    setUserToDelete(user);
    setOpenF(true);
  };

  const handleCloseF = () => {
    setOpenF(false);
    setUserToDelete(null);
  };

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
  const [findUser, setFindUser] = useState({
    FullName: "",
    CitizenId: "",
    NameEnglish: "",
  });

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isSmallScreen = useMediaQuery("(max-width: 1100px)");

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleEdit = (user) => {
    findById(user.id);
    setIsEditMode(true);
    setOpen(true);
  };

  useEffect(() => {
    if (userDetail) {
      setNewUser(userDetail);
    }
  }, [userDetail]);

  const handleFindChange = (e) => {
    setFindUser({ ...findUser, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    createUser(newUser);
    resetUser();
    setOpen(false);
    fetchData(page, rowsPerPage);
  };

  const handleUpdate = (id) => {
    updateUser(id, newUser);
    resetUser();
    setIsEditMode(false);
    setOpen(false);
    fetchData(page, rowsPerPage);
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
    resetFindUser();
  };

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        fetchData(page, rowsPerPage);
        handleCloseF(); // Close dialog after successful deletion
      } catch (error) {
        // Handle error
      }
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false);
    resetUser();
  };

  const resetUser = () => {
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

  const resetFindUser = () => {
    setFindUser({
      FullName: "",
      CitizenId: "",
      NameEnglish: "",
    });
  };

  useEffect(() => {
    fetchData(page, rowsPerPage);
  }, [page, rowsPerPage, fetchData]);

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

  return (
    <>
      <div>
        {SnackbarComponent}
        <SearchAndActions
          isSmallScreen={isSmallScreen}
          handleFind={handleFind}
          findUser={findUser}
          handleFindChange={handleFindChange}
          handleClickOpen={handleClickOpen}
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          handleSwitchChange={handleSwitchChange}
          newUser={newUser}
          handleCreate={handleCreate}
          isEditMode={isEditMode}
          handleUpdate={handleUpdate}
        />
      </div>
      {isSmallScreen ? (
        data.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            handleEdit={handleEdit}
            handleDelete={() => handleClickOpenF(user)}
          />
        ))
      ) : (
        <StyledTableContainer>
          <Table component={Paper}>
            <UserTableHead />
            <UserTableBody
              data={data}
              page={page}
              rowsPerPage={rowsPerPage}
              handleEdit={handleEdit}
              handleDelete={(user) => handleClickOpenF(user)}
            />
          </Table>
          <Dialog
            open={openF}
            onClose={handleCloseF}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Bạn có chắn chắn muốn xóa
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Bạn sẽ không thể khôi phục dữ liệu này sau khi xóa.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseF}>Không</Button>
              <Button onClick={handleDelete} color="primary" autoFocus>
                Có
              </Button>
            </DialogActions>
          </Dialog>
          <UserTablePagination
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </StyledTableContainer>
      )}
    </>
  );
}

export default UserTable;
