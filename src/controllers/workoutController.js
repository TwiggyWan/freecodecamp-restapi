// pas compris pourquoi on met une lambda dans une variable au lieu de déclarer une fonction
// => = lambda

const workoutService = require ("../services/workoutService");

const getAllWorkouts = (req, res) => {
    const allWorkouts = workoutService.getAllWorkouts();
    res.send({status: "OK", data: allWorkouts });
};

const getWorkout = (req, res) => {
    const workout = workoutService.getWorkout();
    res.send("get an existing workout");
};

const createWorkout = (req, res) => {
    const createdWorkout = workoutService.createWorkout();
    res.send("create a new workout");
};

// un paramètre (workoutid) est passé mais ça n'apparait pas dans le prototype des fonctions du service
const updateWorkout = (req, res) => {
    const updatedWorkout = workoutService.updateWorkout();
    res.send("Update an existing workout");
};

const deleteWorkout = (req, res) => {
    workoutService.deleteWorkout();
    res.send("Delete an existing workout");
};

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
}
