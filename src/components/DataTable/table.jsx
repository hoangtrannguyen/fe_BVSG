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
    email: "",
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

  const initialUserFields = [
    { name: "fullName", label: "Họ và tên", required: true },
    { name: "citizenId", label: "CCCD", required: true },
    { name: "phone", label: "Số điện thoại", required: true },
    {
      name: "dateStartWork",
      label: "Ngày bắt đầu làm việc",
      required: true,
      type: "date",
    },
    { name: "email", label: "Email" },
    { name: "nameEnglish", label: "Tên tiếng anh" },
    { name: "permanentAddresses", label: "Địa chỉ thường trú" },
    { name: "temporaryAddress", label: "Địa chỉ tạm trú" },
    { name: "dateOfBirth", label: "Ngày sinh", type: "date" },
    {
      name: "gender",
      label: "Giới tính",
      type: "radio",
      options: ["Male", "Female", "Other"],
    },
    {
      name: "bloodGroup",
      label: "Nhóm máu",
      type: "radio",
      options: ["A", "B", "O", "AB", "Other"],
    },
    { name: "maritalStatus", label: "Tình trạng hôn nhân", type: "switch" },
    { name: "militaryClass", label: "Lớp nghĩa vụ" },
    { name: "militaryTime", label: "Thời gian nghĩa vụ", type: "date" },
    { name: "license", label: "Giấy phép lái xe" },
    { name: "contact", label: "Liên hệ chính" },
    { name: "academicLevel", label: "Trình độ học vấn" },
    { name: "language", label: "Ngôn ngữ" },
    { name: "otherExpertise", label: "Kinh nghiệm khác", type: "textarea" },
    { name: "familyStatus", label: "Tình trạng gia đình" },
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
  } = useUserTable(initialSearchFields, initialNewUser, 1);

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
