const express = require ("express");
const router = express.Router();
const workoutController = require ("../../controllers/workoutController");
const recordController = require ("../../controllers/recordController")

//http://localhost:3000/api/v1/workouts/
router.get("/", workoutController.getAllWorkouts);

//http://localhost:3000/api/v1/workouts/5555
router.get("/:workoutId", workoutController.getWorkout);

router.get("/:workoutId/records", recordController.getRecords);

router.post("/", workoutController.createWorkout);

// patch: quand on edite un truc qui existe déjà (le u de crud)
router.patch("/:workoutId", workoutController.updateWorkout);

router.delete("/:workoutId", workoutController.deleteWorkout);


// https://expressjs.com/fr/api.html
// If you follow the pattern in which you create a module that just exports a middleware function and require() it in your main file, then the middleware can access the Express instance via req.app

// ça doit rendre les trucs visibles d'ailleurs dans le programme..
module.exports = router;
