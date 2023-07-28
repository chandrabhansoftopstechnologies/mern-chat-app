const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const expressAsyncHandler = require("express-async-handler");

const Protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log("protect middleware token ", token);
      // decode token id
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("protect middleware decode token ", decode);

      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "UnAuthorised User", success: false });
      throw new Error("Not authorised token failed");
    }
  } else if (!token) {
    res.status(401).json({ message: "UnAuthorised User", success: false });
    throw new Error("Not authorised token failed");
  }
});

module.exports = { Protect };
