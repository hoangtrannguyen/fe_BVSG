

  return (
    <div>
      {isMobile ? (
        <AppBarStyled position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleNavOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              BVSG
            </Typography>
            <Menu
              anchorEl={nav}
              open={Boolean(nav)}
              onClose={handleNavClose}
            >
              <MenuItem onClick={() => handleNavigation("/")}>
                Home
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/About")}>
                About
              </MenuItem>
              <MenuItem onClick={() => handleNavigation("/Setting")}>
                Quản lý nhân viên
              </MenuItem>
            </Menu>
            <Box sx={{ flexGrow: 1 }} />
            <ListItemButton onClick={handleMenuOpen}>
              <ListItemIcon>
                <Avatar src={"/img/avatar.jpg"} alt="User Avatar" />
              </ListItemIcon>
              <ListItemText primary="Tài khoản" />
            </ListItemButton>
          </Toolbar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleNavigation("/account-detail")}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Chi tiết tài khoản
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
          </Menu>
        </AppBarStyled>
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
