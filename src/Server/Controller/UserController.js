const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const generateToken = require("./generateToken");

//register user
const Register = expressAsyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "All field required", success: false });
    throw new Error("Please enter all fields");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(409).json({ message: "User already exist", success: false });
    throw new Error("User already exist");
  } else {
    const newUser = await User({
      name,
      email,
      password,
      pic,
    });
    if (newUser) {
      res.status(201).json({
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          pic: newUser.pic,
          token: generateToken(newUser._id),
        },
        message: "User Registered",
        success: true,
      });
      newUser.save();
    } else {
      res.status(400).json({ message: "Something went wrong", success: false });
      throw new Error("Something went wrong");
    }
  }
});
//login api
const Login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist && (await userExist.matchPassword(password))) {
    res.status(201).json({
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      password: userExist.password,
      pic: userExist.pic,
      token: generateToken(userExist._id),
    });
  } else {
    res
      .status(400)
      .json({ message: "Invalid email or password", success: false });
    throw new Error("invalid email or password");
  }
});
//getting all user
const GetSearchUsers = expressAsyncHandler(async (req, res) => {
  const keyword = req.query
    ? {
        $or: [{ name: { $regex: req.query.search, $options: "i" } }],
        $or: [{ email: { $regex: req.query.search, $options: "i" } }],
      }
    : {};

  const users = await User.find(keyword);
  // .find({ _id: { $ne: req.user._id } });
  res.send(users);
});
const GetAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const allUser = await User.find();
    res
      .status(200)
      .json({ message: "All users foound", success: true, data: allUser });
  } catch (error) {}
});

module.exports = { Login, Register, GetSearchUsers, GetAllUsers };
