import SideNav from "../../components/SlideNav/SlideNav";
import Box from "@mui/material/Box";
import UserTable from "../../components/DataTable/table";
import "./setting.css";

const Setting = () => {
  return (
    <>
      <Box className="StyledBox">
        <SideNav></SideNav>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Quản lý nhân viên</h1>
          <UserTable />
        </Box>
      </Box>
    </>
  );
};

export default Setting;
