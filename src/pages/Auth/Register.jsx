import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useSignUp } from "../../services/useRegister";
import { useSnackBar } from "../../services/useSnackBar";

function Signup() {
  const { signUpUser } = useSignUp();
  const { SnackbarComponent, showSnackbar } = useSnackBar();
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: null,
    password: null,
    confirmPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      showSnackbar("Passwords do not match", "error");
      return;
    }
    try {
      const alert = await signUpUser(signupData);
      showSnackbar(alert.message, alert.type);
    } catch (error) {
      showSnackbar(error.message, "error");
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
      <Typography variant="h5">Sign Up</Typography>
      <TextField
        label="First Name"
        name="firstName"
        type="text"
        value={signupData.firstName}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Last Name"
        name="lastName"
        type="text"
        value={signupData.lastName}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={signupData.email}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={signupData.password}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={signupData.confirmPassword}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Role"
        name="role"
        type="text"
        value={signupData.role}
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
        Sign Up
      </Button>
      {SnackbarComponent}
    </Box>
  );
}

export default Signup;
