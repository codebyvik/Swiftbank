const express = require("express");
const Beneficiary = require("../controllers/beneficiary");
const router = express.Router();
const passport = require("passport");

// admin

router.get("/delete/:id", passport.checkAuthentication, Beneficiary.deleteBeneficiary);
router.post("/update/:id", passport.checkAuthentication, Beneficiary.updateBeneficiary);
router.post("/add", passport.checkAuthentication, Beneficiary.addBenefeciary);
router.get("/:id", passport.checkAuthentication, Beneficiary.getBeneficiaryDetails);
router.get("/", passport.checkAuthentication, Beneficiary.getAllBeneficiaries);
module.exports = router;
