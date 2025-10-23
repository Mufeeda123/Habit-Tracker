import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Settings theme palette
  const palette = {
    bg: "#252934",
    primary: "#6862DB",
    success: "#77D27B",
    text: "#F9FAFB",
    textMuted: "rgba(249,250,251,0.75)",
    divider: "rgba(249,250,251,0.06)",
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(loginStatus === "true");
    setUserName(storedUser?.name || "");
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setIsLoggedIn(loginStatus === "true");
      setUserName(storedUser?.name || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        borderRadius: 0,
        zIndex: 1200,
        backgroundColor: palette.bg,
        color: palette.text,
        borderBottom: `1px solid ${palette.divider}`,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1,
          px: 3,
          backgroundColor: palette.bg,
          color: palette.text,
        }}
      >
        {/* Brand Logo / Title */}
        <Typography
          variant="h6"
          sx={{
            cursor: "pointer",
            fontWeight: 700,
            color: palette.text,
            letterSpacing: 0.5,
          }}
          onClick={() => navigate("/Home")}
        >
          🌱 Habit Tracker
        </Typography>

        {/* Right Section */}
        {!isLoggedIn ? (
          <Box>
            <Button
              startIcon={<LoginIcon />}
              sx={{
                mr: 1.5,
                px: 3,
                py: 0.8,
                borderRadius: "30px",
                backgroundColor: palette.primary,
                color: palette.text,
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { backgroundColor: "#5750c7" },
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              startIcon={<PersonAddAltIcon />}
              sx={{
                px: 3,
                py: 0.8,
                borderRadius: "30px",
                border: `1px solid ${palette.primary}`,
                color: palette.text,
                fontWeight: 600,
                textTransform: "none",
                backgroundColor: "transparent",
                "&:hover": { backgroundColor: "rgba(104,98,219,0.15)" },
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Box>
        ) : (
          <div>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar
                sx={{
                  bgcolor: palette.success,
                  fontWeight: 600,
                  color: "#0b0e16",
                }}
              >
                {userName ? userName[0].toUpperCase() : "U"}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: "12px",
                  mt: 1,
                  backgroundColor: "#2b3041",
                  color: palette.text,
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/Settings");
                }}
              >
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </Paper>
  );
}

export default Header;
