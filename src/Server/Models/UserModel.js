const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 12;

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    pic: {
      type: String,
      default: "https://img.freepik.com/free-icon/user_318-159711.jpg",
    },
  },
  {
    timestamps: true,
  }
);

UserModel.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserModel.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  } else {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", UserModel);
module.exports = User;
