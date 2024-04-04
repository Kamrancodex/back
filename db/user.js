const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rohitvlogs02:RwH0X8bJF3IpfoxL@cluster0.lhw3atd.mongodb.net/usersDb"
);
const signupSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", signupSchema);

module.exports = { User };
