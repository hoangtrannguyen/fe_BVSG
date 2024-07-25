import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import FetchData from "../../services/employee/crud";

function Login() {
  const { loginUser, SnackbarComponent } = FetchData();
  const [loginData, setLoginData] = useState({
    email: null,
    password: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(loginData.email, loginData.password);
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <Typography variant="h5">Sign In</Typography>
      <TextField
        label="Email"
        name="email"
        type="email"
        value={loginData.email}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={loginData.password}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ marginTop: 2 }}
      >
        Sign In
      </Button>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        <a href="#">Forget Your Password?</a>
      </Typography>
      {SnackbarComponent} {/* Để hiển thị thông báo Snackbar */}
    </Box>
  );
}

export default Login;
