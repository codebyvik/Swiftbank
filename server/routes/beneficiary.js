const express = require("express");
const Beneficiary = require("../controllers/beneficiary");
const router = express.Router();
const passport = require("passport");

// admin
router.get("/", passport.checkAuthentication, Beneficiary.getAllBeneficiaries);
router.post("/:id", passport.checkAuthentication, Beneficiary.addBenefeciary);
router.get("/delete/:id", passport.checkAuthentication, Beneficiary.deleteBeneficiary);
router.post("/update/:id", passport.checkAuthentication, Beneficiary.updateBeneficiary);

module.exports = router;
