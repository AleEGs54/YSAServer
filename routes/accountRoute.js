const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const validateAccount = require("../utilities/account-validation");
const accountController = require("../controllers/accountController");

/* ***************************
 *  GET
 * ************************** */

router.get("/leaders",
     utilities.handleErrors(accountController.getLeaders));

router.get("/leaders/getRoles",
     utilities.handleErrors(accountController.getRoles));

router.get("/leaders/:role",
     utilities.handleErrors(accountController.getLeadersByRole));

/* ***************************
 *  POST
 * ************************** */
router.post("/login",
    validateAccount.loginRules(),
    validateAccount.checkLoginData,
     utilities.handleErrors(accountController.accountLogin));

module.exports = router;
