const partModel = require("../models/participantModel")
const partController = {}


partController.getParticipants = async (req, res) => {
    const participants = await partModel.getAllParticipants()
    res.json(participants)
}

partController.getParticipantById = async (req, res) => {
    const { id } = req.params
    const participant = await partModel.getParticipantById(id)
    res.json(participant)
}

module.exports = partController