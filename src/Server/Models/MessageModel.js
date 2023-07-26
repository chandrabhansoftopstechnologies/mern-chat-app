const mongoose = require("mongoose");

const MessageModel = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.ObjectId, ref: "Chat" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", MessageModel);
