const express = require("express");
const {
  borrowBook,
  returnBook,
} = require("../controllers/borrowBookController");
const { authenticate } = require("../middlewares/authMiddleware");
const borrowBookRoute = express.Router();

borrowBookRoute.post("/:bookId", authenticate, borrowBook);
borrowBookRoute.post("/return/:borrowId", authenticate, returnBook);

module.exports = borrowBookRoute;
