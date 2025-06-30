const accountController = {};
const accountModel = require("../models/accountModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ***************************
 *  LOGIN
 * ************************** */
accountController.accountLogin = async (req, res) => {
    try {
        
        const { account_email, account_password } = req.body;
        const accountData = await accountModel.accountLogin(account_email, account_password);

        if (!accountData) {
            res.status(401).json({
                success:false,
                message:"Login failed",
                error:"Invalid email or password"
            })
        } 
            

            res.status(200).json({
                success:true,
                message:"Login successful",

            })
        
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error logging in.",
            error: error.message
        })
    }
};

module.exports = accountController;
