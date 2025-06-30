const accountModel = {};
const pool = require("../database");

accountModel.getAccountByEmail = async (account_email) => {
    try {
        const query = `SELECT * FROM leadership_member WHERE account_email = $1`;
        const { rows } = await pool.query(query, [account_email]);
        return rows;
    } catch (error) {
        console.error(`Error getting account by email: ${error}`);
    }
};


//editar, hacer solo de contraseña hasheada
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
