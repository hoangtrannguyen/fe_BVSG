import React from "react";
import { Box, TextField, Typography, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import UserDialog from "../GridStyle/Dialog";

function SearchAndActions({
  isSmallScreen,
  findUser,
  handleFindChange,
  handleFind,
  handleClickOpen,
  open,
  handleClose,
  handleChange,
  handleSwitchChange,
  newUser,
  handleCreate,
  isEditMode,
  handleUpdate,
}) {
  return (
    <Box
      className="searchArea"
      sx={{
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "center" : "flex-start",
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
          name="NameEnglish"
          label="Mã nhân viên"
          variant="filled"
          value={findUser.code}
          onChange={handleFindChange}
          fullWidth
        />
        <TextField
          size="small"
          autoFocus
          name="FullName"
          label="Họ và tên"
          variant="filled"
          value={findUser.FullName}
          onChange={handleFindChange}
          fullWidth
        />

        <TextField
          size="small"
          name="CitizenId"
          label="CMDN/CCCD"
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
  );
}

export default SearchAndActions;
