const expressAsyncHandler = require("express-async-handler");
const Chat = require("../Models/ChatModel");
const User = require("../Models/UserModel");

const AccessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});
const FetchChats = expressAsyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).json({
          message: "Fetched successfully",
          success: true,
          data: result,
        });
      });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", success: false });
  }
});

const CreateGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.users) {
    return res
      .status(400)
      .json({ message: "Please fill all fields", success: false });
  }
  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res.status(400).json({
      message: "More than 2 person is required to form a group",
      success: false,
    });
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res
      .status(200)
      .json({ message: "All group chat", success: true, data: fullGroupChat });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong", success: false });
  }
});
const RenameGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedChat) {
    res.status(400).json({ message: "Chat not found", success: false });
  } else {
    res.status(200).json({
      message: "Chat name updated",
      success: false,
      data: updatedChat,
    });
  }
});

const AddToGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const userAdded = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!userAdded) {
    res.status(400).json({ message: "Chat not found", success: false });
  } else {
    res
      .status(400)
      .json({ message: "User Added ", success: true, data: userAdded });
  }
});
const RemoveFromGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const userRemove = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!userRemove) {
    res.status(400).json({ message: "Chat not found", success: false });
  } else {
    res
      .status(400)
      .json({ message: "User Added ", success: true, data: userRemove });
  }
});
module.exports = {
  AccessChat,
  FetchChats,
  CreateGroupChat,
  RenameGroup,
  AddToGroup,
  RemoveFromGroup,
};
