const express = require("express");
const { loginUser, registerUser } = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/login", loginUser);
userRoute.post("/register", registerUser);

module.exports = userRoute;
