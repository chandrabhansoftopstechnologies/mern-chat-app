const express = require("express");
const { Protect } = require("../Middleware/AuthMiddleware");
const {
  AccessChat,
  FetchChats,
  CreateGroupChat,
  RenameGroup,
  AddToGroup,
  RemoveFromGroup,
} = require("../Controller/ChatContrller");
const router = express.Router();

router.post("/access-chat", Protect, AccessChat);
router.get("/fetch-chats", Protect, FetchChats);
router.post("/create-group-chat", Protect, CreateGroupChat);
router.put("/rename-group", Protect, RenameGroup);
router.put("/add-to-group", Protect, AddToGroup);
router.put("/remove-from-group", Protect, RemoveFromGroup);

module.exports = router;
