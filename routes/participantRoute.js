const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const partController = require("../controllers/participantController");

/* ***************************
 *  GET
 * ************************** */
router.get("/all", utilities.handleErrors(partController.getParticipants));
router.get("/columns", utilities.handleErrors(partController.getColumnNames));
router.get("/id/:id", utilities.handleErrors(partController.getParticipantById));


module.exports = router;