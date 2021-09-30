const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");

// routes for login and registration
router.route("/login").post(login);

router.route("/register").post(register);

module.exports = router;

