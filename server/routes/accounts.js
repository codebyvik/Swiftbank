const express = require("express");
const passport = require("passport");
const accounts = require("../controllers/accounts");

const router = express.Router();

router.post("/update-pin", passport.checkAuthentication, accounts.updateTransactionPin);

router.get("/dashboard", passport.checkAuthentication, accounts.dashboard);

router.get("/", passport.checkAuthentication, accounts.getAllAccounts);
router.get("/:id", passport.checkAuthentication, accounts.getSingleAccount);

module.exports = router;
