const express = require("express");
const user = require("../controllers/user");
const router = express.Router();
const passport = require("passport");

// admin
router.get("/all", passport.checkAuthentication, user.getAllUsers);

// return user
router.get("/:id", passport.checkAuthentication, user.getUser);

// update user profile
router.post("/update/:id", passport.checkAuthentication, user.updateProfile);
router.post("/update/password/:id", passport.checkAuthentication, user.updatePassword);

module.exports = router;
