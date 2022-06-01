// since it's same as for the workouts i just copypaste now.
const DB = require("./db.json");

const getRecords = (workoutId) => {
    try {
        //on stocke le tableau 'records' à l'extérieur de 'workouts'
        //probablement pour mieux splitter la db en tables?
        //on pourrait très bien faire une seule grosse table, ce qui est d'ailleurs
        //le fonctionnement constaté de l'extérieur avec le endpoint:
        // /api/v1/workouts/:workoutId/records
        // mais parce qu'on aime se faire chier, on va "cloisonner" les records dans
        // 5 autres fichiers..
        const records = DB.records.filter((i) => i.workout === workoutId);
        if (!records) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`,
            };
        }
        return records;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};
module.exports = { getRecords };
