const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const leaderController = require("../controllers/leaderController");

/* ***************************
 *  GET
 * ************************** */

router.get("/",
     utilities.handleErrors(leaderController.getLeaders));

router.get("/role/:role",
     utilities.handleErrors(leaderController.getLeadersByRole));

router.get("/id/:id",
     utilities.handleErrors(leaderController.getLeaderByParticipantId));


/* ***************************
 *  POST
 * ************************** */
router.post("/add-leader",
     utilities.handleErrors(leaderController.addLeader));

module.exports = router;
