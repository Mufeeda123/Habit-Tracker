import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill all fields!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user data to localStorage
    const userData = {
      name: form.name,
      email: form.email,
      password: form.password,
    };
    localStorage.setItem("user", JSON.stringify(userData));

    alert("Signup successful!");
    navigate("/login"); // redirect to login
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",   //full height
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 5, borderRadius: 3, backgroundColor: "#ffffff" }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 4, textAlign: "center", color: "#3da63d", fontWeight: 600 }}
        >
          Sign Up
        </Typography>

        <TextField
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#c0e6c0", borderRadius: 1 }}
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#c0e6c0", borderRadius: 1 }}
        />
        <TextField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#c0e6c0", borderRadius: 1 }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#c0e6c0", borderRadius: 1 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: "#3da63d",
            color: "#fff",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#3da63d" },
          }}
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <Box sx={{ mt: 2, textAlign: "center", color: "#555" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#3da63d" }}>
            Login
          </a>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
