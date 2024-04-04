const { User } = require("../db/user");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
function SigninMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const words = token.split(" ");
  const jwtToken = words[1];
  try {
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if (decodedValue.username) {
      next();
    } else {
      res.status(403).json({
        msg: "Invalid Token",
      });
    }
  } catch (e) {
    res.json({
      msg: "Invalid Token",
    });
  }
}
module.exports = SigninMiddleware;
