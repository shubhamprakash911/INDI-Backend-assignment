const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Email not found, Please register first");
  }

  if (user && (await user.matchPassword(password))) {
    sendToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create(req.body);

  if (user) {
    sendToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

module.exports = { loginUser, registerUser };
