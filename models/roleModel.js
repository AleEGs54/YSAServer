const roleModel = {};
const pool = require("../database");

roleModel.getRoles = async () => {
  try {
    const query = `SELECT * FROM leadership_role`;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(`Error getting roles: ${error}`);
  }
};

roleModel.getRoleById = async (staff_role_id) => {
  try {
    const query = `SELECT * FROM leadership_role WHERE staff_role_id = $1`;
    const { rows } = await pool.query(query, [staff_role_id]);
    return rows;
  } catch (error) {
    console.error(`Error getting role by id: ${error}`);
  }
};

module.exports = roleModel;