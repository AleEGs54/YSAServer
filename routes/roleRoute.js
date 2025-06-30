const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const roleController = require("../controllers/roleController");

/* ***************************
 *  GET
 * ************************** */

router.get("/all",
     utilities.handleErrors(roleController.getRoles));

router.get('/:id',
     utilities.handleErrors(roleController.getRoleById));

module.exports = router;
