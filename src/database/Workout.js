const DB = require ("./db.json");

//genre pourquoi on fait ça au lieu d'une simple fonction?
//https://www.w3schools.com/js/js_arrow_function.asp
const getAllWorkouts = () => {
    return DB.workouts;
}

module.exports = {
    getAllWorkouts,
}
