import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { StyledTableHead, StyledTableRow } from "./tableStyle";

function UserTableHead() {
  return (
    <StyledTableHead>
      <StyledTableRow>
        <TableCell>STT</TableCell>
        <TableCell>Mã nhân viên</TableCell>
        <TableCell>Ngày bắt đầu</TableCell>
        <TableCell>Họ và tên</TableCell>
        <TableCell>CMND/CCCD</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Giới tính</TableCell>
        <TableCell>Điện thoại</TableCell>
        <TableCell>Ngôn ngữ</TableCell>
        <TableCell></TableCell>
      </StyledTableRow>
    </StyledTableHead>
  );
}

export default UserTableHead;
