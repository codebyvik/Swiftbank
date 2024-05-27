const express = require("express");
const user = require("../controllers/user");
const router = express.Router();
const passport = require("passport");

// configure multer
const multer = require("multer");
const path = require("path");

const AVATAR_PATH = path.join("/uploads/users/avatars/");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// return current user
router.get("/", passport.checkAuthentication, user.sendCurrentUser);

// admin
router.get("/all", passport.checkAuthentication, user.getAllUsers);

// return particular user
router.get("/:id", passport.checkAuthentication, user.getUser);

// update user profile
router.post(
  "/update/:id",
  passport.checkAuthentication,
  upload.single("avatar"),
  user.updateProfile
);
router.post("/update/forgot-password/", user.forgotPassword);

module.exports = router;
