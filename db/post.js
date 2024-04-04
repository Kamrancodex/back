const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rohitvlogs02:RwH0X8bJF3IpfoxL@cluster0.lhw3atd.mongodb.net/usersDb"
);
const postSchema = mongoose.Schema({
  blogPost: String,
  username:String
});
const Post = mongoose.model("Post", postSchema);
module.exports = { Post };
