const Workout = require ("../database/Workout");

// It's also a good practice to name the service methods the same as the controller methods
// so that you have a connection between those. Let's start off with just returning nothing.
const getAllWorkouts = () => {
    return Workout.getAllWorkouts();
};

const getWorkout = () => {
  return;
};

const createWorkout = () => {
  return;
};

const updateWorkout = () => {
  return;
};

const deleteWorkout = () => {
  return;
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
