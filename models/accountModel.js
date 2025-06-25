const accountModel = {};
const pool = require("../database");

accountModel.getRoles = async () => {
  try {
    const query = `SELECT * FROM leadership_role`;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(`Error getting roles: ${error}`);
  }
};

accountModel.getAllLeaders = async () => {
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

accountModel.getLeadersByRole = async (role) => {
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

accountModel.getAccountByEmail = async (account_email) => {
    try {
        const query = `SELECT * FROM leadership_member WHERE account_email = $1`;
        const { rows } = await pool.query(query, [account_email]);
        return rows;
    } catch (error) {
        console.error(`Error getting account by email: ${error}`);
    }
};

accountModel.accountLogin = async (account_email, account_password) => {
  try {
    const query = `SELECT * FROM leadership_member WHERE account_email = $1 AND account_password = $2`;
    const { rows } = await pool.query(query, [account_email, account_password]);
    return rows;
  } catch (error) {
    console.error(`Error logging in: ${error}`);
  }
};

module.exports = accountModel;
