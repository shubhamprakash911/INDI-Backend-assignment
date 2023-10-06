const jwt = require("jsonwebtoken");

const sendToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production(https)
    sameSite: "strict", // Prevent CSRF attacks | telling the browser to include that cookie only in requests that originate from the same site (origin) where the cookie was set.
  });
};

module.exports = sendToken;
