const express = require("express");

const router = express.Router();

router.use("/api/v1/auth", require("./auth"));
router.use("/api/v1/user", require("./user"));
router.use("/api/v1/beneficiary", require("./beneficiary"));
router.use("/api/v1/transaction", require("./transaction"));
router.use("/api/v1/transaction", require("./transaction"));
router.use("/api/v1/account", require("./accounts"));

module.exports = router;
