import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Switch,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  FormControlLabel,
  Drawer,
  IconButton,
  Divider,
  Paper,
  useMediaQuery,
  Grid,
} from "@mui/material";
import {
  Person,
  Lock,
  Notifications,
  Checklist,
  Settings as Gear,
  Logout,
  Delete,
  Menu as MenuIcon,
  KeyboardArrowRight,
} from "@mui/icons-material";

const sections = [
  { name: "Edit Profile", key: "Profile", icon: <Person /> },
  { name: "Change password", key: "Change Password", icon: <Lock /> },
  { name: "Notification preferences", key: "Notifications", icon: <Notifications /> },
  { name: "Habit preferences", key: "Habit Preferences", icon: <Checklist /> },
  { name: "Account", key: "Account", icon: <Gear /> },
];

function SettingsHabitTracker() {
  const palette = {
    bg: "#252934",
    primary: "#6862DB",
    success: "#77D27B",
    yellow: "#FBFA83",
    info: "#89DEF5",
    pink: "#EF8FA2",
    text: "#F9FAFB",
    textMuted: "rgba(249,250,251,0.65)",
    divider: "rgba(249,250,251,0.06)",
  };
  const navigate = useNavigate();
  const { section: sectionParam } = useParams();
  const [activeSection, setActiveSection] = useState("Profile");
  const [user, setUser] = useState({ name: "", email: "" });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    reminderTime: "08:00",
  });
  const [habitPreferences, setHabitPreferences] = useState({
    defaultCategory: "Health",
    markDoneInstant: true,
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [appleHealthEnabled, setAppleHealthEnabled] = useState(
    JSON.parse(localStorage.getItem("appleHealthEnabled") || "false")
  );

  const isDesktop = useMediaQuery("(min-width:960px)");
  const isMobile = useMediaQuery("(max-width:959px)");

  // Load data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({ name: storedUser.name, email: storedUser.email });
      setNotifications(
        storedUser.notifications || {
          dailyReminder: true,
          reminderTime: "08:00",
        }
      );
      setHabitPreferences(
        storedUser.habitPreferences || {
          defaultCategory: "Health",
          markDoneInstant: true,
        }
      );
    }
  }, []);

  // Sync active section with route param
  useEffect(() => {
    if (!sectionParam) return;
    const paramToKey = {
      profile: "Profile",
      "change-password": "Change Password",
      notifications: "Notifications",
      "habit-preferences": "Habit Preferences",
      account: "Account",
    };
    const mapped = paramToKey[sectionParam.toLowerCase()];
    if (mapped) {
      setActiveSection(mapped);
    }
  }, [sectionParam]);

  // Handlers
  const handleProfileChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) =>
    setPassword({ ...password, [e.target.name]: e.target.value });
  const handleHabitPrefChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setHabitPreferences({ ...habitPreferences, [e.target.name]: value });
  };

  const saveProfile = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const updatedUser = { ...storedUser, ...user };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated!");
  };

  const changePassword = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    if (password.new !== password.confirm)
      return alert("Passwords do not match");
    if (password.current !== storedUser.password)
      return alert("Current password incorrect");
    storedUser.password = password.new;
    localStorage.setItem("user", JSON.stringify(storedUser));
    alert("Password updated!");
    setPassword({ current: "", new: "", confirm: "" });
  };

  const saveHabitPreferences = () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const updatedUser = { ...storedUser, habitPreferences };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Habit Preferences updated!");
  };

  const updateDailyReminder = (e) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const updatedNotifications = {
      ...notifications,
      dailyReminder: e.target.checked,
    };
    setNotifications(updatedNotifications);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...storedUser, notifications: updatedNotifications })
    );
    alert("Notifications updated");
  };

  const updateReminderTime = (e) => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const updatedNotifications = {
      ...notifications,
      reminderTime: e.target.value,
    };
    setNotifications(updatedNotifications);
    localStorage.setItem(
      "user",
      JSON.stringify({ ...storedUser, notifications: updatedNotifications })
    );
    alert("Reminder time updated");
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      localStorage.clear();
      window.location.href = "/signup";
    }
  };

  // Renders the selected section
  const renderSection = () => (
    <Container sx={{ p: 2 }}>
      {/* Profile */}
      {activeSection === "Profile" && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Profile
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: palette.success, mr: 2 }}>
              {user.name?.[0]?.toUpperCase() || "U"}
            </Avatar>
            <TextField
              label="Name"
              name="name"
              value={user.name}
              onChange={handleProfileChange}
              fullWidth
              
            />
          </Box>
          <TextField
            label="Email"
            value={user.email}
            disabled
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={saveProfile} sx={{ mt: 1,  "&:hover": { bgcolor: "#5750c7" } }}>
            Save Profile
          </Button>
        </>
      )}

      {/* Change Password */}
      {activeSection === "Change Password" && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Change Password
          </Typography>
          <TextField
            label="Current Password"
            name="current"
            type="password"
            value={password.current}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="New Password"
            name="new"
            type="password"
            value={password.new}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            name="confirm"
            type="password"
            value={password.confirm}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={changePassword} sx={{ mt: 1, bgcolor: palette.primary, "&:hover": { bgcolor: "#5750c7" } }}>
            Update Password
          </Button>
        </>
      )}

      {/* Notifications */}
      {activeSection === "Notifications" && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Notifications
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={notifications.dailyReminder}
                onChange={updateDailyReminder}
              />
            }
            label="Daily Reminder"
          />
          <TextField
            type="time"
            label="Reminder Time"
            value={notifications.reminderTime}
            onChange={updateReminderTime}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}

      {/* Habit Preferences */}
      {activeSection === "Habit Preferences" && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Habit Preferences
          </Typography>
          <TextField
            label="Default Category"
            name="defaultCategory"
            value={habitPreferences.defaultCategory}
            onChange={handleHabitPrefChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Switch
                name="markDoneInstant"
                checked={habitPreferences.markDoneInstant}
                onChange={handleHabitPrefChange}
              />
            }
            label="Mark Habit Done Instantly"
          />
          <Button
            variant="contained"
            onClick={saveHabitPreferences}
            sx={{ mt: 2, bgcolor: palette.primary, "&:hover": { bgcolor: "#5750c7" } }}
          >
            Save Preferences
          </Button>
        </>
      )}

      {/* Account */}
      {activeSection === "Account" && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Account
          </Typography>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            sx={{ mb: 2 }}
            onClick={deleteAccount}
          >
            Delete Account
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={logout}
          >
            Logout
          </Button>
        </>
      )}
    </Container>
  );

  const handleNavigateToSection = (key) => {
    const keyToSlug = {
      "Profile": "profile",
      "Change Password": "change-password",
      "Notifications": "notifications",
      "Habit Preferences": "habit-preferences",
      "Account": "account",
    };
    const slug = keyToSlug[key];
    if (slug) {
      navigate(`/Settings/${slug}`);
    }
  };

  const isSectionPage = Boolean(sectionParam);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // Gradient background similar to screenshot
        background: `radial-gradient(1200px 600px at 100% -10%, rgba(0, 255, 200, 0.25) 0%, rgba(0,0,0,0) 60%),
                     radial-gradient(1000px 700px at -10% 0%, rgba(64, 117, 255, 0.35) 0%, rgba(0,0,0,0) 55%),
                     linear-gradient(180deg, #1b2231 0%, #0f1420 100%)`,
        color: palette.text,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box sx={{ px: 2, py: 2, display: "flex", justifyContent: "center" }}>
        <Typography variant="subtitle1" sx={{ opacity: 0.85 }}>
          Settings
        </Typography>
      </Box>

      {/* Top intro card (glassy) */}
      <Box sx={{ px: 2 }}>
        <Paper
          elevation={0}
          sx={{
            background: "rgba(21, 27, 40, 0.6)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: palette.text,
            borderRadius: 3,
            p: 2,
            border: `1px solid ${palette.divider}`,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
            Settings
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Manage your profile, notifications and preferences
          </Typography>
        </Paper>
      </Box>

      {/* Main content */}
      {isDesktop ? (
        <Grid container spacing={2} sx={{ px: 2, pb: 4 }}>
          <Grid item xs={12} md={3}>
            <Paper
              elevation={0}
              sx={{
                background: "rgba(21, 27, 40, 0.55)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: `1px solid ${palette.divider}`,
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
                <Avatar sx={{ width: 56, height: 56, bgcolor: palette.success, mr: 2 }}>
                  {user.name?.[0]?.toUpperCase() || "U"}
                </Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{user.name || "User"}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75 }}>{user.email || ""}</Typography>
                </Box>
              </Box>
              <Divider sx={{ borderColor: palette.divider }} />
              <List>
                {sections.map((s) => {
                  const isActive = activeSection === s.key;
                  return (
                    <ListItemButton
                      key={s.key}
                      onClick={() => handleNavigateToSection(s.key)}
                      sx={{
                        px: 2,
                        background: isActive ? "rgba(104,98,219,0.25)" : "transparent",
                        borderLeft: isActive ? `3px solid ${palette.primary}` : "3px solid transparent",
                      }}
                    >
                      <ListItemIcon sx={{ color: palette.textMuted }}>{s.icon}</ListItemIcon>
                      <ListItemText
                        primary={s.name}
                        primaryTypographyProps={{ color: palette.text, fontWeight: isActive ? 700 : 500 }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper
              elevation={0}
              sx={{
                background: "rgba(21, 27, 40, 0.6)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderRadius: 3,
                border: `1px solid ${palette.divider}`,
              }}
            >
              {renderSection()}
            </Paper>
          </Grid>
        </Grid>
      ) : isSectionPage ? (
        // When on a section route, show the section content directly as a page using a glass card
        <Box sx={{ px: 2, pb: 4 }}>
          <Paper
            elevation={0}
            sx={{
              background: "rgba(21, 27, 40, 0.6)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              borderRadius: 3,
              border: `1px solid ${palette.divider}`,
            }}
          >
            {renderSection()}
          </Paper>
        </Box>
      ) : (
        // Otherwise, show the settings list
        <List sx={{ mt: 1 }}>
          {sections.map((s) => (
            <>
              <ListItemButton
                key={s.key}
                onClick={() => handleNavigateToSection(s.key)}
                sx={{ px: 2 }}
              >
                <ListItemIcon sx={{ color: palette.textMuted }}>{s.icon}</ListItemIcon>
                <ListItemText
                  primary={s.name}
                  primaryTypographyProps={{ color: palette.text }}
                />
                <KeyboardArrowRight sx={{ color: palette.textMuted }} />
              </ListItemButton>
              <Divider sx={{ borderColor: palette.divider }} />
            </>
          ))}

          {/* Apple Health */}
          <ListItemButton sx={{ px: 2 }}>
            <ListItemIcon sx={{ color: palette.textMuted }}>
              <Checklist />
            </ListItemIcon>
            <ListItemText
              primary="Apple Health"
              primaryTypographyProps={{ color: palette.text }}
            />
            <Switch
              edge="end"
              checked={appleHealthEnabled}
              onChange={(e) => {
                const v = e.target.checked;
                setAppleHealthEnabled(v);
                localStorage.setItem("appleHealthEnabled", JSON.stringify(v));
              }}
              sx={{
                "& .Mui-checked": { color: palette.primary },
                "& .Mui-checked + .MuiSwitch-track": { backgroundColor: palette.primary },
              }}
            />
          </ListItemButton>
          <Divider sx={{ borderColor: palette.divider }} />

          {/* Logout */}
          <ListItemButton sx={{ px: 2 }} onClick={logout}>
            <ListItemIcon sx={{ color: palette.textMuted }}>
              <Logout />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ color: palette.text }}
            />
            <KeyboardArrowRight sx={{ color: palette.textMuted }} />
          </ListItemButton>
          <Divider sx={{ borderColor: palette.divider }} />
        </List>
      )}
    </Box>
  );
}

export default SettingsHabitTracker;
