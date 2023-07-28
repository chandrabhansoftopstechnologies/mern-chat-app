const express = require("express");
const {
  Login,
  Register,
  GetSearchUsers,
  GetAllUsers,
} = require("../Controller/UserController");
const { Protect } = require("../Middleware/AuthMiddleware");
const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/get-search-users", Protect, GetSearchUsers);
router.get("/get-all-users", Protect, GetAllUsers);

module.exports = router;
