import SideNav from "../../components/SlideNav/SlideNav";
import { Box, Typography } from "@mui/material";
import AccountTable from "../../components/AccountMn/Account";
import "./account.css";

const Account = () => {
  return (
    <>
      <Box className="StyledBox">
        <SideNav></SideNav>
        <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: 5 }}>
          <Typography
            variant="h4"
            component="h4"
            marginTop={2}
            marginBottom={2}
          >
            Quản lý tài khoản
          </Typography>
          <AccountTable />
        </Box>
      </Box>
    </>
  );
};

export default Account;
