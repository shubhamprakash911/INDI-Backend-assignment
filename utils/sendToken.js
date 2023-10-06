const jwt = require("jsonwebtoken");

const sendToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict", // Prevent CSRF attacks | telling the browser to include that cookie only in requests that originate from the same site (origin) where the cookie was set.
  });
};

module.exports = sendToken;
