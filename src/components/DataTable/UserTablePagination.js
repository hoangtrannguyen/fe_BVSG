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
          `Trang ${page + 1} trên ${Math.ceil(
            count / rowsPerPage
          )}  | Số lượng : ${count} `
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
