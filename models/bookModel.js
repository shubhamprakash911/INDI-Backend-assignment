const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - ISBN
 *         - title
 *         - author
 *         - publishedYear
 *         - quantity
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         ISBN:
 *           type: string
 *           description: uniq ISBN of book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         publishedYear:
 *           type: number
 *           description: Published year of book
 *         quantity:
 *           type: number
 *           description: Quantity of book
 *         genre:
 *           type: String
 *           description: Genre of book
 *       example:
 *         ISBN: ASDF1234
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         publishedYear: 2023
 *         quantity: 5
 *         genre: finction
 */

const bookSchema = new mongoose.Schema({
  ISBN: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  quantity: { type: Number, required: true },
  genre: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
