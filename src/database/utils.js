const fs = require ("fs");

const saveToDB = (DB) => {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    fs.writeFileSync (
        "./src/database/db.json",
        JSON.stringify(DB, null, 4),
        { encoding: "utf-8",}
    );
};

module.exports = {
    saveToDB
}
