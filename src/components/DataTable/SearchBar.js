import React from "react";
import { Box, TextField, Typography, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import UserDialog from "../GridStyle/Dialog";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

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
  handleExport,
  handleCreate,
  isEditMode,
  handleUpdate,
  handleResetFindUser,
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
          variant="h8"
          sx={{ display: isSmallScreen ? "none" : "default" }}
        >
          Search
        </Typography>
        <TextField
          size="small"
          name="Code"
          label="Mã nhân viên"
          variant="filled"
          value={findUser.Code}
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
          width: isSmallScreen ? "60%" : "fit-content",
        }}
      >
        {isSmallScreen ? (
          <>
            {" "}
            <Button
              variant="contained"
              onClick={handleFind}
              sx={{
                backgroundColor: "skyblue",
                borderRadius: isSmallScreen ? "" : "20%",
                "&:hover": { backgroundColor: "#a0b7f7" },
              }}
            >
              <SearchIcon />
            </Button>
            <Button
              variant="contained"
              onClick={handleResetFindUser}
              sx={{
                backgroundColor: "skyblue",
                borderRadius: isSmallScreen ? "" : "20%",
                "&:hover": { backgroundColor: "#a0b7f7" },
              }}
            >
              <RestartAltIcon />
            </Button>
          </>
        ) : (
          <Box
            gap={3}
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              variant="contained"
              onClick={handleFind}
              sx={{
                backgroundColor: "skyblue",
                borderRadius: isSmallScreen ? "" : "20%",
                "&:hover": { backgroundColor: "#a0b7f7" },
              }}
            >
              <SearchIcon />
            </Button>
            <Button
              variant="contained"
              onClick={handleResetFindUser}
              sx={{
                backgroundColor: "skyblue",
                width: "50px",
                height: "50px",
                borderRadius: isSmallScreen ? "" : "20%",
                "&:hover": { backgroundColor: "#a0b7f7" },
              }}
            >
              <RestartAltIcon />
            </Button>
            <Button
              variant="contained"
              onClick={handleExport}
              sx={{
                backgroundColor: "skyblue",
                borderRadius: isSmallScreen ? "" : "20%",
                "&:hover": { backgroundColor: "#a0b7f7" },
              }}
            >
              <FileUploadIcon />
            </Button>
          </Box>
        )}

        <Button
          variant="contained"
          onClick={handleClickOpen}
          color="primary"
          sx={{
            borderRadius: isSmallScreen ? "" : "20%",
            "&:hover": { backgroundColor: "#a0b7f7" },
          }}
        >
          <AddIcon />
        </Button>
      </Box>
      <UserDialog
        open={open}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        newUser={newUser}
        handleExport={handleExport}
        handleCreate={handleCreate}
        isEditMode={isEditMode}
        handleUpdate={handleUpdate}
        handleResetFindUser={handleResetFindUser}
      />
    </Box>
  );
}

export default SearchAndActions;
