const express = require("express");
const passport = require("passport");
const auth = require("../controllers/auth");

const router = express.Router();

router.post("/signup", auth.signup);
router.post("/signin", passport.authenticate("local", { failWithError: true }), auth.signin);
router.get("/signout", auth.signout);
router.post("/reset-link", auth.sendResetLink);
router.post("/toggle", auth.toggleUserStatus);

module.exports = router;

//
