const express = require("express");
const app = express();
app.use(express.json());
const { User } = require("../db/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const bcrypt = require("bcrypt");
const router = express.Router();
const mongoose = require("mongoose");
// const SignupMiddleware = require("../middlewares/signup");

router.post("/signup", async (req, res) => {
  const { name, username, password, email } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (existingUser) {
    return res.status(403).json({
      msg: "User already registered",
    });
  }

  // Hash password
  const saltRounds = 10; // It's generally a good practice to make the salt rounds configurable
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // If user does not exist, create a new user with hashed password
  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword, // store the hashed password
  });

  // Optionally, generate JWT token for the user
  // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  return res.json({
    msg: "Account created",
    user,
    // token, // You can also send the token if you wish
  });
});

module.exports = router;
