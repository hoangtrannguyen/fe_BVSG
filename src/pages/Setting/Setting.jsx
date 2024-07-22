import SideNav from "../../components/SlideNav/SlideNav";
import { Box, Typography } from "@mui/material";
import UserTable from "../../components/DataTable/table";
import "./setting.css";

const Setting = () => {
  return (
    <>
      <Box className="StyledBox">
        <SideNav></SideNav>
        <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 5 }}>
          <Typography
            variant="H1"
            component="H1"
            marginTop={2}
            marginBottom={2}
          >
            Quản lý nhân viên
          </Typography>
          <UserTable />
        </Box>
      </Box>
    </>
  );
};

export default Setting;
