const partModel = require("../models/participantModel")
const partController = {}

/* ***************************
 *  GET
 * ************************** */

partController.getParticipants = async (req, res) => {

    try {
        const participants = await partModel.getAllParticipants()
        res.status(200).json({
            success:true,
            message:"Participants fetched successfully",
            data:participants,
            meta:{
                total:participants.length
            }
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error fetching participants",
            error: error.message
        })
    }



}

partController.getParticipantById = async (req, res) => {
    try {
        const { id } = req.params
        const participant = await partModel.getParticipantById(id)

        if(!participant){
            return res.status(404).json({
                success:false,
                message:`Participant ${id} not found`,
                error:"Participant not found"
            })
        }

        res.status(200).json({
            success:true,
            message:`Participant ${id} fetched successfully`,
            data:participant,
            meta:{
                total:participant.length
            }
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:`Error fetching participant ${id}`,
            error: error.message
        })
    }

}

partController.getColumnNames = async (req, res) => {
    try {
        const headers = await partModel.getColumnNames()
        res.status(200).json({
            success:true,
            message:"Headers fetched successfully",
            data:headers,
            meta:{
                total:headers.length
            }
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error fetching headers",
            error: error.message
        })
    }
}


module.exports = partController