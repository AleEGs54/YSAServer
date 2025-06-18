const pool = require("../database")
const participantModel = {}

/* **********************
 *   Return all participants
 * ********************* */

participantModel.getAllParticipants = async function() {
    try {
        const query = `SELECT * FROM participant`
        const { rows } = await pool.query(query)
        return rows
    } catch (error) {
        console.log(error)
    }
}

participantModel.getParticipantById = async function(id) {
    try {
        const query = `SELECT * FROM participant WHERE participant_id = $1`
        const { rows } = await pool.query(query, [id])
        return rows
    } catch (error) {
        console.log(error)
    }
}



module.exports = participantModel