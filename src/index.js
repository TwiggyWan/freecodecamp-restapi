const express = require ("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("ça marche");
})

// apparemment ya un format ES6 aussi dans le tuto
// jsp pourquoi ya besoin d'un million de façons de concaténer des strings dans le log
// https://stackoverflow.com/questions/16600925/how-can-i-add-a-variable-to-console-log
app.listen(PORT, () => {
    console.log("API is listening on port" + PORT);
})
