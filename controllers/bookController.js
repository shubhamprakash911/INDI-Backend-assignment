const asyncHandler = require("../middlewares/asyncHandler");
const Book = require("../models/bookModel");
const Borrow = require("../models/borrowModel");

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

/**
 * @swagger
 * /api/book/search:
 *   get:
 *     summary: Search for books by title, author, or ISBN
 *     tags: [Books]
 *     description: Search for books in the library by title, author, or ISBN.
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: The title of the book to search for.
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: The author of the book to search for.
 *       - in: query
 *         name: isbn
 *         schema:
 *           type: string
 *         description: The ISBN of the book to search for.
 *     responses:
 *       '200':
 *         description: Books matching the search criteria have been found.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       '404':
 *         description: No books found matching the search criteria.
 */
const searchBook = asyncHandler(async (req, res) => {
  const { title, author, isbn } = req.query;

  // Create a query object based on the provided search criteria
  const query = {};
  if (title) {
    query.title = { $regex: title, $options: "i" }; // Case-insensitive title search
  }
  if (author) {
    query.author = { $regex: author, $options: "i" }; // Case-insensitive author search
  }
  if (isbn) {
    query.ISBN = isbn; // Exact ISBN search
  }

  const books = await Book.find(query);

  if (books.length === 0) {
    res.status(404);
    throw new Error("No books found matching the search criteria.");
  }

  res.json(books);
});

/**
 * @swagger
 * /api/book/recommend:
 *   get:
 *     summary: Recommend books by author to the user
 *     tags: [Books]
 *     description: Recommend books by the same author to the user based on their borrowing history.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Recommended books have been successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
const recommendBooksByAuthor = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // Find books previously borrowed by the user
  const userBorrows = await Borrow.find({ user: userId }).populate("book");

  // Extract unique authors from the borrowed books
  const uniqueAuthors = [
    ...new Set(userBorrows.map((borrow) => borrow.book.author)),
  ];

  // Find books with the same author that the user hasn't borrowed
  const recommendedBooks = await Book.find({ author: { $in: uniqueAuthors } })
    .where("_id")
    .nin(userBorrows.map((borrow) => borrow.book._id))
    .limit(5); // You can limit the number of recommendations

  res.json(recommendedBooks);
});

module.exports = {
  createBook,
  updateBookById,
  deleteBookById,
  getBooks,
  searchBook,
  recommendBooksByAuthor,
};
