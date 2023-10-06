const express = require("express");
const {
  getBooks,
  createBook,
  updateBookById,
  deleteBookById,
} = require("../controllers/bookController");
const { authenticate, admin } = require("../middlewares/authMiddleware");
const bookRoute = express.Router();

bookRoute
  .route("/")
  .get(authenticate, getBooks)
  .post(authenticate, admin, createBook);
bookRoute
  .route("/:id")
  .patch(authenticate, admin, updateBookById)
  .delete(authenticate, admin, deleteBookById);

module.exports = bookRoute;
