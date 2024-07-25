import React from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Pagination,
} from "@mui/material";
import useUserTable from "../Hook/useUserTable";

const StyledTableContainer = styled(TableContainer)`
  background: #fdfdfd;
  border-radius: 12px;
  border: 2px solid #cecbcb;
`;

function UserTable() {
  const initialSearchFields = [
    { name: "Code", label: "Mã nhân viên", value: "" },
    { name: "FullName", label: "Họ và tên", value: "" },
    { name: "CitizenId", label: "CMDN/CCCD", value: "" },
  ];

  const initialNewUser = {
    fullName: "",
    nameEnglish: "",
    citizenId: "",
    email: null,
    picture: null,
    dateStartWork: "",
    permanentAddresses: "",
    temporaryAddress: "",
    dateOfBirth: null,
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
  };
  const {
    data,
    total,
    page,
    rowsPerPage,
    searchFields,
    newUser,
    isEditMode,
    open,
    openF,
    SnackbarComponent,
    handleCreate,
    handleFindChange,
    handleEdit,
    handleChange,
    isSmallScreen,
    handleClickOpenF,
    handleChangeRowsPerPage,
    handleSwitchChange,
    handleChangePage,
    handleClose,
    handleClickOpen,
    handleDelete,
    handleExport,
    handleResetFindUser,
    handleFind,
    handleUpdate,
    handleCloseF,
  } = useUserTable(initialSearchFields, initialNewUser);

  return (
    <>
      <div>
        {SnackbarComponent}
        <SearchAndActions
          isSmallScreen={isSmallScreen}
          handleFind={handleFind}
          searchFields={searchFields}
          handleFindChange={handleFindChange}
          handleClickOpen={handleClickOpen}
          open={open}
          handleClose={handleClose}
          handleChange={handleChange}
          handleExport={handleExport}
          handleSwitchChange={handleSwitchChange}
          newUser={newUser}
          handleCreate={handleCreate}
          isEditMode={isEditMode}
          handleUpdate={handleUpdate}
          handleResetFindUser={handleResetFindUser}
        />
      </div>
      {isSmallScreen ? (
        <>
          {data.map((user, index) => (
            <UserCard
              key={user.id}
              user={user}
              index={index}
              handleEdit={handleEdit}
              handleDelete={(user) => handleClickOpenF(user)}
            />
          ))}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={Math.ceil(total / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              sx={{ position: "sticky", bottom: 0 }}
            />
          </Box>
        </>
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

          <UserTablePagination
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </StyledTableContainer>
      )}
      <Dialog open={openF} onClose={handleCloseF}>
        <DialogTitle>Bạn có chắn chắn muốn xóa</DialogTitle>
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
    </>
  );
}

export default UserTable;
