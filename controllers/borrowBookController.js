const asyncHandler = require("../middlewares/asyncHandler");
const Borrow = require("../models/borrowModel");
/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: API endpoints for borrowing and returning books
 */

/**
 * @swagger
 * /api/borrow/{bookId}:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrow]
 *     description: Borrow a book from the library.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to borrow.
 *     responses:
 *       '201':
 *         description: Book has been successfully borrowed.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *       '400':
 *         description: You have reached the maximum borrow limit (3 books).
 */
const borrowBook = asyncHandler(async (req, res) => {
  const userBorrows = await Borrow.find({ user: req.user._id });

  if (userBorrows.length >= 3) {
    res.status(400);
    throw new Error("You have reached the maximum borrow limit (3 books).");
  }

  // Create a new  borrow record
  const borrow = new Borrow({ user: req.user._id, book: req.params.bookId });
  await borrow.save();

  res.status(201).json({ success: true, data: borrow });
});

/**
 * @swagger
 * /api/borrow/return/{borrowId}:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Borrow]
 *     description: Return a previously borrowed book to the library.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: borrowId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the borrow record to return.
 *     responses:
 *       '200':
 *         description: Book has been successfully returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Borrow'
 *       '404':
 *         description: Borrow record not found.
 */
const returnBook = asyncHandler(async (req, res) => {
  const { borrowId } = req.params;

  const borrow = await Borrow.findById(borrowId);
  if (!borrow) {
    res.status(404);
    throw new Error("Borrow record not found.");
  }

  borrow.returnDate = new Date();
  await borrow.save();

  res.json({ success: true, data: borrow });
});

module.exports = { borrowBook, returnBook };
