import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import ListItemIcon from "@mui/material/ListItemIcon";
import StorageIcon from "@mui/icons-material/Storage";
import BadgeIcon from "@mui/icons-material/Badge";
import HomeIcon from "@mui/icons-material/Home";

const drawerWidth = 240;

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ResponsiveNav() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState(
    window.location.pathname
  );

  React.useEffect(() => {
    const handleLocationChange = () => {
      setSelectedTab(window.location.pathname);
    };

    handleLocationChange(); // Set the initial tab on component mount

    // Listen for changes in the location
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    setSelectedTab(path);
    navigate(path);
    handleMenuClose();
  };

  const drawerContent = (
    <div>
      <DrawerHeader>
        <IconButton onClick={() => setOpen(!open)}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/")}
            sx={{
              backgroundColor:
                selectedTab === "/" ? theme.palette.action.selected : "inherit",
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Trang chủ" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/About")}
            sx={{
              backgroundColor:
                selectedTab === "/About"
                  ? theme.palette.action.selected
                  : "inherit",
            }}
          >
            <ListItemIcon>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation("/Setting")}
            sx={{
              backgroundColor:
                selectedTab === "/Setting"
                  ? theme.palette.action.selected
                  : "inherit",
            }}
          >
            <ListItemIcon>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý nhân viên" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {isMobile ? (
        <>
          <AppBarStyled position="fixed">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleMenuOpen}
                edge="start"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleNavigation("/")}>Home</MenuItem>
                <MenuItem onClick={() => handleNavigation("/About")}>
                  About
                </MenuItem>
                <MenuItem onClick={() => handleNavigation("/Setting")}>
                  Quản lý nhân viên
                </MenuItem>
              </Menu>
              <Typography variant="h6" noWrap component="div">
                BVSG
              </Typography>
            </Toolbar>
          </AppBarStyled>
          <Drawer
            variant="temporary"
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Drawer variant="permanent" open={open}>
            {drawerContent}
          </Drawer>
        </Box>
      )}
    </div>
  );
}
