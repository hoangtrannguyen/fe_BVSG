import React from "react";
import { TablePagination, Pagination } from "@mui/material";

function UserTablePagination({
  count,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}) {
  return (
    <div className="pagination">
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count, page }) =>
          `Page ${page + 1} of ${Math.ceil(
            count / rowsPerPage
          )}  | Num of Users : ${count} `
        }
        ActionsComponent={() => null}
        sx={{ position: "sticky", bottom: 0 }}
      />
      <Pagination
        count={Math.ceil(count / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        showFirstButton
        showLastButton
        className="custom-pagination"
        sx={{ position: "sticky", bottom: 0 }}
      />
    </div>
  );
}

export default UserTablePagination;
