const express = require("express");
const passport = require("passport");
const branch = require("../controllers/branch");

const router = express.Router();

router.post("/update/:id", passport.checkAuthentication, branch.updateBranchDetails);
router.post("/add", passport.checkAuthentication, branch.addBranch);
router.post("/delete", passport.checkAuthentication, branch.deleteBranch);
router.get("/:id", passport.checkAuthentication, branch.getBranchDetails);
router.get("/", branch.getAllBranches);

module.exports = router;
