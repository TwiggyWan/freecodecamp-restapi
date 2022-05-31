const DB = require ("./db.json");

//dans le tuto il ya une syntaxe raccourcie de merde
//const { saveToDatabase } = require("./utils");
//juste parce qu'on a une seule fonction ça se permet d'ajouter une syntaxe différente => c'est nul
const Utils = require ("./utils.js");

//genre pourquoi on fait ça au lieu d'une simple fonction?
//https://www.w3schools.com/js/js_arrow_function.asp
const getAllWorkouts = () => {
    return DB.workouts;
}

const createWorkout = (newWorkout) => {
    const isAlreadyAdded =
          DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

    if (isAlreadyAdded) {
        throw {
            //donc dans le layer database qui se contrefout qu'on ait une api http branchée,
            //on ajoute un code d'erreur http....
            status: 400,
            message: "Workout " + newWorkout.name + " already exists!",
        };
    }

    try {
        DB.workouts.push(newWorkout);
        saveToDB(DB);
        return newWorkout;
    } catch (error) {
        throw {
            status: 500,
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
            message: error?.message || error
        };
    }
    DB.workouts.push(newWorkout);
    Utils.saveToDB(DB);

    return newWorkout;
}

const updateWorkout = (workoutId, changes) => {
    const indexToUpdate = DB.workouts.findIndex(
        (workout) => workout.id === workoutId
    );
    if (indexToUpdate === -1 ) {
        return;
    }

    const updatedWorkout = {
        ...DB.workouts[indexToUpdate],
        //ce qu'il ya dans changes va écraser ce qu'il ya dans DB.workouts
        ...changes,
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    DB.workouts[indexToUpdate] = updatedWorkout;
    saveToDB(DB);
    return updatedWorkout;
}; //faut faire tourner le linter on dirait que les ; sont "optionnels" -> c'est nul

const deleteWorkout = (workoutId) => {
    const index = DB.workouts.findIndex(
        (workout) => workout.id === workoutId
    );
    if (index === -1 ) {
        return;
    }

    //https://www.w3schools.com/jsref/jsref_splice.asp
    DB.workouts.splice(index, 1);
    saveToDB(DB);
}

const getWorkout = (id) => {
    const workout = DB.workouts.find(
        (workout) => workout.id === id
    );
    if (!workout) {
        return;
    }
    return workout;
}

module.exports = {
    getAllWorkouts,
    createWorkout,
    getWorkout,
    updateWorkout,
    deleteWorkout,
}
