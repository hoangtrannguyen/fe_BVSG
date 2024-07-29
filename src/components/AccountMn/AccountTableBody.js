import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTableBody, StyledTableRow } from "../DataTable/tableStyle";

function AccountTableBody({
  data,
  page,
  rowsPerPage,
  handleEdit,
  handleDelete,
}) {
  return (
    <StyledTableBody>
      {data.map((user, index) => (
        <StyledTableRow key={user.id}>
          <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
          <TableCell>{user.firstName + user.lastName}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.roles}</TableCell>
          <TableCell>
            <IconButton onClick={() => handleEdit(user)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(user)} color="error">
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </StyledTableRow>
      ))}
      {data.length < rowsPerPage && (
        <TableRow style={{ height: `${(rowsPerPage - data.length) * 73}px` }}>
          <TableCell colSpan={10} />
        </TableRow>
      )}
    </StyledTableBody>
  );
}

export default AccountTableBody;
