const express = require("express");

const auth = require("../controllers/auth");

const router = express.Router();

router.post("/api/v1/auth", auth.signup);
router.get("/api/v1/auth/getUsers", auth.getUsers);

module.exports = router;
