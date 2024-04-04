const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../db/user");
const JWT_SECRET = require("../config");

const router = express.Router();

router.post("/signin", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  // Find the user by email
  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    return res.status(403).json({
      msg: "User not found or incorrect email.",
    });
  }

  // Compare submitted password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    return res.status(403).json({
      msg: "Incorrect password.",
    });
  }

  // If password matches, generate a JWT token
  const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  // Send the token in the response
  res.json({
    msg: "Welcome back!",
    token,
  });
});

module.exports = router;
