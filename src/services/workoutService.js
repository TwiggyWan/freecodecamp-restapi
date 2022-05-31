const Workout = require ("../database/Workout");

//For the creation of RFC4122 UUIDs
//https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require('uuid');

// It's also a good practice to name the service methods the same as the controller methods
// so that you have a connection between those. Let's start off with just returning nothing.
const getAllWorkouts = () => {
    return Workout.getAllWorkouts();
};

const getWorkout = (workoutId) => {
    return Workout.getWorkout(workoutId);
};

const createWorkout = (newWorkout) => {

    const workoutToInsert = {
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        //apparemment on est trop stupides pour expand nous mêmes notre objet
        //ce truc va expand newWorkout dans l'ordre dans lequel on a ajouté les paramètres
        // donc c'est pas exactement un dico python dans lequel ya pas d'ordre
        ...newWorkout,
        //je copiecolle la syntaxe depuis https://www.npmjs.com/package/uuid, pas celle du tuto
        id: uuidv4(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        //on met ces propriétés dans le service, mais quand on update on le fait dans le layer database
        //wazefuck
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    try {
        return Workout.createWorkout(workoutToInsert);
    } catch (error) {
        throw error;
    }
};

const updateWorkout = (workoutId, body) => {
    return Workout.updateWorkout(workoutId, body);
};

const deleteWorkout = (workoutId) => {
    Workout.deleteWorkout(workoutId)
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
