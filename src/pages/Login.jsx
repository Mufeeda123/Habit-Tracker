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

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found! Please sign up first.");
      return;
    }

    if (
      form.email === storedUser.email &&
      form.password === storedUser.password
    ) {
      alert("Login successful!");
      localStorage.setItem("isLoggedIn", true);
      navigate("/home");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
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
          Login
        </Typography>

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

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: "#3da63d",
            color: "#fff",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#2e8e2e" },
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Box sx={{ mt: 2, textAlign: "center", color: "#555" }}>
          Don’t have an account?{" "}
          <a href="/signup" style={{ color: "#3da63d" }}>
            Sign Up
          </a>
        </Box>

      </Paper>
    </Container>
  );
}

export default Login;
