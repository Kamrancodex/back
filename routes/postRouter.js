const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
const { Post } = require("../db/post");
const { User } = require("../db/user");

router.post("/post", async (req, res) => {
  const { blogPost } = req.body;
  const username = req.headers.username;
  const users = await User.findOne({ username: username });
  console.log(users);
  if (!users) {
    return res.json("user not registered");
  }
  const blog = await Post.create({
    blogPost,
    username,
  });
  res.json({
    msg: "Posted Sucessfully",
    blog,
  });
});
router.get("/posts", async (req, res) => {
  const post = await Post.find({});
  console.log(post);
  const onlyPosts = post.map((blog) => blog.blogPost);
  const onlyUsers = post.map((User) => User.username);

  console.log(onlyPosts);
  console.log(onlyUsers);
  res.json({ onlyPosts, onlyUsers });
});
module.exports = router;
