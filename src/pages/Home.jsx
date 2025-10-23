import React, { useState, useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddHabitForm from "../components/AddHabitForm";
import HabitCard from "../components/AddHabitForm";


function Home() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login"); // redirect if not logged in
    }
  }, [navigate]);

  // Add habit
  const addHabit = (habit) => {
    setHabits([...habits, { ...habit, id: Date.now(), completedDates: [] }]);
  };

  // Toggle habit done
  const toggleHabitDone = (id) => {
    const today = new Date().toDateString();
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const isDone = habit.completedDates.includes(today);
          const updatedDates = isDone
            ? habit.completedDates.filter((d) => d !== today)
            : [...habit.completedDates, today];
          return { ...habit, completedDates: updatedDates };
        }
        return habit;
      })
    );
  };

  return (
    <Container sx={{ mt: 12 }}>
      {/* Add Habit Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add a New Habit
        </Typography>
        <AddHabitForm addHabit={addHabit} />
      </Box>

      {/* Habit List Section */}
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Your Habits
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              toggleHabitDone={toggleHabitDone}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
