const asyncHandler = require("../middlewares/asyncHandler");
const Book = require("../models/bookModel");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 */

/**
 * @swagger
 * /api/book:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     description: Create a new book in the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '201':
 *         description: A new book has been successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ success: true, data: book });
});

/**
 * @swagger
 * /api/book/{id}:
 *   patch:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     description: Update a book's information by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '201':
 *         description: The book has been successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
const updateBookById = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.status(201).json({ success: true, data: book });
});

/**
 * @swagger
 * /api/book/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     description: Delete a book from the system by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the book to delete.
 *     responses:
 *       '201':
 *         description: The book has been successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
const deleteBookById = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  res.status(201).json({ success: true, data: book });
});

/**
 * @swagger
 * /api/book:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     description: Get a list of all books in the system.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of books has been successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.status(201).json({ success: true, data: books });
});

module.exports = { createBook, updateBookById, deleteBookById, getBooks };
