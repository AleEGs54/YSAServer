roleController = {}

const roleModel = require("../models/roleModel");

/* ***************************
 * ROLES
 * ************************** */

roleController.getRoles = async (req, res) => {
    try {
        const roles = await roleModel.getRoles();

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

roleController.getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await roleModel.getRoleById(id);
        res.status(200).json({
            success: true,
            message: "Role fetched successfully",
            data: role,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching role",
            error: error.message,
        });
    }
}

module.exports = roleController