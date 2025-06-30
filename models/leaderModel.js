const pool = require("../database");
const leaderModel = {};

/* ***************************
 *  GET
 * ************************** */

leaderModel.getAllLeaders = async () => {
  try {
    const query = `
      SELECT leadership_member.*, participant.*
      FROM leadership_member
      JOIN participant ON leadership_member.participant_id = participant.participant_id
    `;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(`Error getting all leaders: ${error}`);
  }
};

leaderModel.getLeadersByRole = async (role) => {
  try {
    const query = `
    SELECT leadership_member.*, participant.* 
    FROM leadership_member 
    JOIN participant ON leadership_member.participant_id = participant.participant_id
    WHERE staff_role_id = $1`;
    const { rows } = await pool.query(query, [role]);
    return rows;
  } catch (error) {
    console.error(`Error getting leaders by role: ${error}`);
  }
};

leaderModel.getLeaderById = async (leadership_member_id) => {
    try {
        const query = `
        SELECT * 
        FROM leadership_member 
        JOIN participant ON leadership_member.participant_id = participant.participant_id
        WHERE leadership_member_id = $1`;
        const { rows } = await pool.query(query, [leadership_member_id]);
        return rows[0];
    } catch (error) {
        console.error(`Error getting account by leadership member id: ${error}`);
    }
};


leaderModel.getLeaderByParticipantId = async (participant_id) => {
    try {
        const query = `SELECT * FROM leadership_member WHERE participant_id = $1`;
        const { rows } = await pool.query(query, [participant_id]);
        return rows[0];
    } catch (error) {
        console.error(`Error getting leader by participant id: ${error}`);
    }
};

/* ***************************
 *  ADD
 * ************************** */

leaderModel.addLeader = async (participant_id, account_email, account_password, staff_role_id) => {
    try {
        const query = `INSERT INTO leadership_member (participant_id, account_email, account_password, staff_role_id) VALUES ($1, $2, $3, $4) RETURNING *`;
        const { rows } = await pool.query(query, [participant_id, account_email, account_password, staff_role_id]);
        return rows;
    } catch (error) {
        console.error(`Error adding leader: ${error}`);
    }
};




module.exports = leaderModel;