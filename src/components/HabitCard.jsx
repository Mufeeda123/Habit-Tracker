import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

function HabitCard({ habit, toggleHabitDone }) {
  const today = new Date().toDateString();
  const isDone = habit.completedDates.includes(today);

  return (
    <Card
      sx={{
        width: 220,
        backgroundColor: "#f8fff8",
        borderRadius: "20px",
        boxShadow: "0 3px 8px rgba(61, 166, 61, 0.2)",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.03)" },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#2e7d32" }}>
          {habit.icon} {habit.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray", mt: 0.5 }}>
          {habit.category}
        </Typography>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant={isDone ? "contained" : "outlined"}
            onClick={() => toggleHabitDone(habit.id)}
            sx={{
              borderRadius: "30px",
              px: 3,
              py: 0.8,
              textTransform: "none",
              fontWeight: 500,
              backgroundColor: isDone ? "#3da63d" : "transparent",
              color: isDone ? "white" : "#3da63d",
              borderColor: "#3da63d",
              "&:hover": {
                backgroundColor: isDone ? "#2e7d32" : "rgba(61,166,61,0.1)",
              },
            }}
          >
            {isDone ? "Done ✅" : "Mark Done"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default HabitCard;
