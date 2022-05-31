// pas compris pourquoi on met une lambda dans une variable au lieu de déclarer une fonction
// => = lambda

const workoutService = require ("../services/workoutService");

const getAllWorkouts = (req, res) => {
    try {
        const allWorkouts = workoutService.getAllWorkouts();
        res.send({status: "OK", data: allWorkouts });
    } catch (error) {
        //todo https://stackoverflow.com/questions/18311924/express-js-how-can-i-set-response-status-by-name-rather-than-number
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;
    if ( !workoutId ) {
        return;
    }
    try {
        const workout = workoutService.getWorkout(workoutId);
        res.send({status: "OK", data: workout });
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: {error: error?.message || error }});
    }

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
                    //Leaving this error message more generic for all properties will be okay for now. Typically you'd use a schema validator for handling that.
                    error: "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
                }
            })
    }
//https://livecodestream.dev/post/everything-you-should-know-about-javascript-dictionaries/
    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercies: body.exercises,
        trainerTips: body.trainerTips,
    };

    try {
        const createdWorkout = workoutService.createWorkout(newWorkout);
        res.status(201).send({ status: "OK", data: createdWorkout });
    } catch (error) {
        res.status(error?.status || 500)
            .send({status: "FAILED", data: {error: error?.message || error}});
    }
};

// un paramètre (workoutid) est passé mais ça n'apparait pas dans le prototype des fonctions du service
const updateWorkout = (req, res) => {
    const {
        body,
        params: { workoutId },
    } = req;

    if (!workoutId) {
        res.status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':workoutId' can not be empty" },
            })
    }

    try {
        const updatedWorkout = workoutService.updateWorkout(workoutId, body);
        res.send({ status: "OK", data: updatedWorkout });

    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteWorkout = (req, res) => {
    const {
        params: { workoutId },
    } = req;

    if (!workoutId) {
        res.status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':workoutId' can not be empty"},
            })
    }

    try {
        workoutService.deleteWorkout(workoutId);
        res.status(204).send({ status: "OK" });

    } catch (error) {
        res.status(error?.status || 500)
        //todo remplacer l'objet copié collé par un truc global au fichier
            .send({status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
}
