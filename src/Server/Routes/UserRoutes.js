const express = require("express");
const { Login, Register } = require("../Controller/UserController");
const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);

module.exports = router;
