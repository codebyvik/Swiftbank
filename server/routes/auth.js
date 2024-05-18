const express = require("express");
const passport = require("passport");
const auth = require("../controllers/auth");

const router = express.Router();

router.post("/signup", auth.signup);
router.post("/signin", passport.authenticate("local"), auth.signin);
router.get("/signout", auth.signout);

module.exports = router;

//
