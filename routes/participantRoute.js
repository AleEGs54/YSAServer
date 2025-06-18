const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const partController = require("../controllers/participantController");

/* ***************************
 *  GET
 * ************************** */
router.get("/", utilities.handleErrors(partController.getParticipants));
router.get("/:id", utilities.handleErrors(partController.getParticipantById));

module.exports = router;