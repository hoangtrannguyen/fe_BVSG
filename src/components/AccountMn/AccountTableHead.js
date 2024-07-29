import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { StyledTableHead, StyledTableRow } from "../DataTable/tableStyle";

function AccountTableHead() {
  return (
    <StyledTableHead>
      <StyledTableRow>
        <TableCell>STT</TableCell>
        <TableCell>Họ và tên</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Roles</TableCell>
        <TableCell></TableCell>
      </StyledTableRow>
    </StyledTableHead>
  );
}

export default AccountTableHead;
