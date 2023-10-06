const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Borrow:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user who borrowed the book
 *         book:
 *           type: string
 *           description: The ID of the borrowed book
 *         borrowDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the book was borrowed
 *         returnDate:
 *           type: string
 *           format: date-time
 *           description: The expected return date and time of the book
 *       required:
 *         - user
 *         - book
 *       example:
 *         user: 5fcb4c43e4b0d56088efb77c
 *         book: 5fcb4c43e4b0d56088efb77d
 *         borrowDate: 2023-10-06T10:00:00.000Z
 *         returnDate: 2023-10-20T10:00:00.000Z
 */
const borrowSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
});

const Borrow = mongoose.model("Borrow", borrowSchema);

module.exports = Borrow;
