const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const validate = require("../utilities/database-validation");
const databaseController = require("../controllers/databaseController");

/* ***************************
 *  POST
 * ************************** */
router.post(
  "/update-database",
  utilities.upload.single("file"),
  validate.csvValidator(),
  utilities.handleErrors(databaseController.updateDB)
);

module.exports = router;
