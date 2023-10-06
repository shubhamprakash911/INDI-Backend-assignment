const express = require("express");
const {
  getBooks,
  createBook,
  updateBookById,
  deleteBookById,
  searchBook,
  recommendBooksByAuthor,
} = require("../controllers/bookController");
const { authenticate, admin } = require("../middlewares/authMiddleware");
const bookRoute = express.Router();

bookRoute.get("/search", searchBook);
bookRoute.get("/recommend", authenticate, recommendBooksByAuthor);

bookRoute.route("/").get(getBooks).post(authenticate, admin, createBook);
bookRoute
  .route("/:id")
  .patch(authenticate, admin, updateBookById)
  .delete(authenticate, admin, deleteBookById);

module.exports = bookRoute;
