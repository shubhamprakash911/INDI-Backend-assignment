const jwt = require("jsonwebtoken");

const sendToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  res.cookies("token", token);
};

module.exports = sendToken;
