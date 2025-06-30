const express = require("express");
const router = new express.Router();
const utilities = require("../utilities");
const validateAccount = require("../utilities/account-validation");
const accountController = require("../controllers/accountController");

/* ***************************
 *  POST
 * ************************** */
router.post("/login",
    validateAccount.loginRules(),
    validateAccount.checkLoginData,
     utilities.handleErrors(accountController.accountLogin));


module.exports = router;
