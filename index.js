const express = require("express");
const port = 3000;
const app = express();
app.use(express.json());
const signupRouter = require("./routes/signupRouter");
const signinRouter = require("./routes/signinRouter");
const postRouter = require("./routes/postRouter");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.json());
app.use("/register", signupRouter);
app.use("/signin", signinRouter);
app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`working bro`);
});
