const Record = require("../database/Record");

const getRecords = (workoutId) => {
    try {
        return Record.getRecords(workoutId);
    } catch (error) {
        throw error;
    }
};
module.exports = { getRecords };
