
const leaderController = {};
const leaderModel = require("../models/leaderModel");

/* ***************************
 * GET LEADERS
 * ************************** */

leaderController.getLeaders = async (req, res) => {
    try {
        const leaders = await leaderModel.getAllLeaders();
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



leaderController.getLeadersByRole = async (req, res) => {
    try {
        const { role } = req.params;

        const leaders = await leaderModel.getLeadersByRole(role);

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

leaderController.getLeaderByParticipantId = async (req, res) => {
    try {
        const { id } = req.params;
        const leader = await leaderModel.getLeaderByParticipantId(id);

        if (!leader) {
            return res.status(204).json({
                success: false,
                message: "Leader not found.",
                error: "We could not find the leader.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Leader fetched successfully",
            data: leader,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching leader ",
            error: error.message,
        });
    }
}

/* ***************************
 * ADD LEADERS
 * ************************** */

leaderController.addLeader = async (req, res) => {
    const { participant_id, account_email, account_password, staff_role_id } = req.body;


    try {

        const existingLeader = await leaderModel.getLeaderByParticipantId(participant_id);
        if (existingLeader) {
            return res.status(409).json({
                success: false,
                message: "Leader already exists",
                error: "Participant is already a leader",
            });
        }

        const leader = await leaderModel.addLeader(participant_id, account_email, account_password, staff_role_id);

        if (leader) {
            const leaderInfo = await leaderModel.getLeaderById(leader[0].leadership_member_id);

            res.status(201).json({
                success: true,
                message: "Leader added successfully",
                data: leaderInfo
            });

        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding leader",
            error: error.message,
        });
    }
    
}

module.exports = leaderController