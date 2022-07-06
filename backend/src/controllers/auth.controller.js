require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY);
};

const register = async (req, res) => {
  try {
    // check if the email address provided is already exist
    var user = await User.findOne({ email: req.body.email }).lean().exec();

    //if it already exists then throw an error
    if (user) {
      return res.status(400).json({ status: "failed", message: err.message });
    }
    //else we will create the user we will hash the password as plain text password is harmful
    user = await User.create(req.body);

    // we will create the token and
    const token = newToken(user);

    // return the user and the token
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
};

const login = async (req, res) => {
  try {
    //check if the email address provided already exists

    let userLog = await User.findOne({ email: req.body.email });

    // if it doesn't exist then throw error
    if (!userLog) {
      return res.status(400).json({
        status: "failed",
        message: "pls provide correct email and password not exist",
      });
    }

    // else we will match then throw an error

    const match = await userLog.checkPassword(req.body.password);

    // if not match then throw an error
    if (!match) {
      return res.status(400).json({
        status: "failed",
        message: "pls provide correct details email or password",
      });
    }

    // if it matches then create the token and
    const token = newToken(userLog);

    // return the user and the token
    return res.status(201).json({ userLog, token });
  } catch (err) {
    return res.status(500).json({ status: "Failed", message: err.message });
  }
};

module.exports = { register, login, newToken };
