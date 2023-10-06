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
 *         id: 651fb86a8772977ecc3918e6
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

const bookSchema = new mongoose.Schema({
  ISBN: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  quantity: { type: Number, required: true },
  genre: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
