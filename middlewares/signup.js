const { User } = require("../db/user");

function SignupMiddleware(req, res, next) {
  const email = req.body.email;
  const username = req.body.username;
  try {
    async () => {
      const usernameExists = await User.findOne({
        username: req.body.username,
      });
      const emailExists = await User.findOne({ email: req.body.email });
      if (usernameExists && emailExists)
        return res.status(400).send("Username and email already taken");
      if (emailExists) return res.status(400).send("Email already taken");
      if (usernameExists) return res.status(400).send("Username already taken");
    };
  } catch (e) {
    return res
      .status(500)
      .send("Error querying DB to check if username/email exists or not");
  }
}
module.exports = SignupMiddleware;
