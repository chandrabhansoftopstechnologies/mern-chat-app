const expressAsyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const generateToken = require("./generateToken");
const Register = expressAsyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
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
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        pic: newUser.pic,
        token: generateToken(newUser._id),
      });
      newUser.save();
    } else {
      res.status(400);
      throw new Error("Something went wrong");
    }
  }
});
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
    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});

module.exports = { Login, Register };
