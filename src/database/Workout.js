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
        return;
    }

    DB.workouts.push(newWorkout);
    Utils.saveToDB(DB);

    return newWorkout;
}

module.exports = {
    getAllWorkouts,
    createWorkout,
}
