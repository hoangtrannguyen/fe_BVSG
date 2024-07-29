import React from "react";
import "../DataTable/table.css";
import styled from "styled-components";
import SearchAndActions from "../DataTable/SearchBar";
import UserCard from "../DataTable/UserCard";
import AccountTableBody from "./AccountTableBody";
import AccountTableHead from "./AccountTableHead";
import UserTablePagination from "../DataTable/UserTablePagination";
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
import { type } from "@testing-library/user-event/dist/type";

const StyledTableContainer = styled(TableContainer)`
  background: #fdfdfd;
  border-radius: 12px;
  border: 2px solid #cecbcb;
`;

function AccountTable() {
  const initialSearchFields = [
    { name: "Email", label: "Email", value: "" },
    { name: "Role", label: "Vai trò", value: "" },
  ];

  const initialNewUser = {
    firstName: "",
    lastName: "",
    confirmPassword: "",
    email: "",
    password: "",
    roles: [""],
  };

  const initialUserFields = [
    { name: "firstName", label: "Tên", required: true },
    { name: "lastName", label: "Họ", required: true },
    { name: "email", label: "Email", required: true },
    { name: "confirmPassword", label: "Confirm Password", required: true },
    { name: "password", label: "Password", required: true },
    { name: "roles", label: "Vai trò", required: true, type: "roles" },
  ];
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
  } = useUserTable(initialSearchFields, initialNewUser, 2);

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
          initialUserFields={initialUserFields}
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
            <AccountTableHead />
            <AccountTableBody
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

export default AccountTable;
