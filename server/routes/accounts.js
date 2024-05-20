const express = require("express");
const passport = require("passport");
const accounts = require("../controllers/accounts");

const router = express.Router();

router.post("/update-pin", passport.checkAuthentication, accounts.updateTransactionPin);

module.exports = router;
