const express = require ("express");
const bodyParser = require ("body-parser");
const v1WorkoutRouter = require ("./v1/routes/workoutRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

//https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json/47232318#47232318
//ATTENTION si je mets cette ligne APRES app.use v1WorkoutRouter ça explose :
//TypeError: Cannot read properties of undefined at createWorkout at workoutController.js
app.use (bodyParser.json());

app.use ("/api/v1/workouts", v1WorkoutRouter);



// apparemment ya un format ES6 de string
// jsp pourquoi ya besoin d'un million de façons de concaténer des strings dans le log
// https://stackoverflow.com/questions/16600925/how-can-i-add-a-variable-to-console-log
app.listen(PORT, () => {
    console.log("API is listening on port" + PORT);
})
