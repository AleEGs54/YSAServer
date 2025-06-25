const accountController = {};
const accountModel = require("../models/accountModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ***************************
 *  LEADERS
 * ************************** */

accountController.getLeaders = async (req, res) => {
    try {
        const leaders = await accountModel.getAllLeaders();
        res.status(200).json({
            success: true,
            message: "Leaders fetched successfully",
            data: leaders,
            meta: {
                total: leaders.length,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching leaders",
            error: error.message,
        });
    }
}

accountController.getRoles = async (req, res) => {
    try {
        const roles = await accountModel.getRoles();

        if (!roles) {
            res.status(404).json({
                success: false,
                message: "Roles not found.",
                error: "No Roles in the database.",
            });
        }


        res.status(200).json({
            success: true,
            message: "Roles fetched successfully",
            data: roles,
            meta: {
                total: roles.length,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching roles",
            error: error.message,
        });
    }
}

accountController.getLeadersByRole = async (req, res) => {
    try {
        const { role } = req.params;

        const leaders = await accountModel.getLeadersByRole(role);

        if (!leaders) {
            res.status(404).json({
                success: false,
                message: "Leaders not found.",
                error: "Invalid role id.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Leaders fetched successfully",
            data: leaders,
            meta: {
                total: leaders.length,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching leaders",
            error: error.message,
        });
    }
}

/* ***************************
 *  LOGIN
 * ************************** */
accountController.accountLogin = async (req, res) => {
    try {
        
        const { account_email, account_password } = req.body;
        const accountData = await accountModel.accountLogin(account_email, account_password);

        if (!account) {
            res.status(401).json({
                success:false,
                message:"Login failed",
                error:"Invalid email or password"
            })
        } 
            

            res.status(200).json({
                success:true,
                message:"Login successful",
                data:account,
                meta:{
                    total:account.length
                }
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
