import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Paper,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";  
import BookIcon from "@mui/icons-material/Book";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function AddHabitForm({ addHabit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("General");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addHabit({
      name,
      category,
      icon:
        category === "Health" ? "💪" : category === "Learning" ? "📘" : "✅",
      frequency: "daily",
    });
    setName("");
    setCategory("General");
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        backdropFilter: "blur(8px)",
        bgcolor: "rgba(255,255,255,0.6)",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 480,
        mx: "auto",
        mt: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          color: "#2e7d32",
        }}
      >
        Add New Habit
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          label="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <FormControl sx={{ minWidth: 130 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="General">
              <CheckCircleIcon sx={{ mr: 1, color: "#3da63d" }} /> General
            </MenuItem>
            <MenuItem value="Health">
              <FitnessCenterIcon sx={{ mr: 1, color: "#3da63d" }} /> Health
            </MenuItem>
            <MenuItem value="Learning">
              <BookIcon sx={{ mr: 1, color: "#3da63d" }} /> Learning
            </MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#3da63d",
            px: 3,
            py: 1,
            borderRadius: 2,
            "&:hover": { bgcolor: "#2e8e2e", transform: "scale(1.03)" },
            transition: "all 0.2s ease",
          }}
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
}

export default AddHabitForm;
