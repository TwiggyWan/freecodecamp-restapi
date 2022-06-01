const recordService = require ("../services/recordService");

const getRecords = (req, res) => {

    if ( !req.params.workoutId ) {
        return;
    }

    try {
        const records = recordService.getRecords(req.params.workoutId);

        res.send({status: "OK", data: records });
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

module.exports = {
    getRecords,
}
