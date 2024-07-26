import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useLogin } from "../../services/useLogin";
import { useSnackBar } from "../../services/useSnackBar";

function Login() {
  const { loginUser } = useLogin();
  const { SnackbarComponent, showSnackbar } = useSnackBar();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const alert = await loginUser(loginData.email, loginData.password);
      showSnackbar(alert.message, alert.type);
    } catch (error) {
      showSnackbar(alert.message, alert.type);
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
        justifyContent: "center",
        padding: 3,
        maxWidth: 400,
        margin: "auto",
        border: "2px solid #000",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        height: "fit-content",
        marginTop: "10%",
        marginBottom: "10%",
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
      {SnackbarComponent}
    </Box>
  );
}

export default Login;
