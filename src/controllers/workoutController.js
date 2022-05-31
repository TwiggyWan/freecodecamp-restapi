// pas compris pourquoi on met une lambda dans une variable au lieu de déclarer une fonction
// => = lambda

const workoutService = require ("../services/workoutService");

const getAllWorkouts = (req, res) => {
    const allWorkouts = workoutService.getAllWorkouts();
    res.send({status: "OK", data: allWorkouts });
};

const getWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;
    if ( !workoutId ) {
        return;
    }
    const workout = workoutService.getWorkout(workoutId);
    res.send({status: "OK", data: workout });
};

const createWorkout = (req, res) => {
//To improve the request validation you normally would use a third party package like express-validator.
    const { body } = req;

    if (!body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips)
    {
        //c'est illisible
        //on peut modifier un des paramètres donnés
        // mais 'req' qui n'est pas modifié n'est pas flag const
        //todo voir si on peut faire ça en js (probablement que oui)
        res.status(400)
            .send({
                status: "FAILED",
                data: {
                    error: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
                }
            })
        return;
    }
//https://livecodestream.dev/post/everything-you-should-know-about-javascript-dictionaries/
    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercies: body.exercises,
        trainerTips: body.trainerTips,
    };

    const createdWorkout = workoutService.createWorkout(newWorkout);

    res.status(201).send({ status: "OK", data: createdWorkout });
};

// un paramètre (workoutid) est passé mais ça n'apparait pas dans le prototype des fonctions du service
const updateWorkout = (req, res) => {
    const {
        body,
        params: { workoutId },
    } = req;

    if (!workoutId) {
        return;
    }
    const updatedWorkout = workoutService.updateWorkout(workoutId, body);

    res.send({ status: "OK", data: updatedWorkout });
};

const deleteWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;

    if (!workoutId) {
        return;
    }

    workoutService.deleteWorkout(workoutId);
    res.status(204).send({ status: "OK" });
};

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
}
