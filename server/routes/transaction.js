const express = require("express");
const passport = require("passport");
const transaction = require("../controllers/transaction");

const router = express.Router();

router.get("/", passport.checkAuthentication, transaction.getAllTransactions);
router.post("/send", passport.checkAuthentication, transaction.sendMoney);
router.post("/add", passport.checkAuthentication, transaction.addMoney);
router.get("/:id", passport.checkAuthentication, transaction.getOneTransaction);

module.exports = router;
