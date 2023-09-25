import { books } from "../data.js";
import { validate, v4 as uuid } from "uuid";
import { bookService } from "../services/bookService.js";
import { sanitizeObj } from "../utils/sanitizeObj.js";
import { BOOK_FIELDS } from "../const/allowedFields.js";

const API_KEY = "qwerty%%$$@@123456uiopasdfghjkl";

class BookController {
    // Get all books (with optional genre filter)
    getAllBooks = (req, res) => {
        const books = bookService.getAllBooks(req.query);
        res.status(200).json({ data: books });
    };

    // Create a new book
    createABook = (req, res) => {
        const data = sanitizeObj(BOOK_FIELDS, req.body);
        const book = bookService.createABook(data);
        res.status(201).json({ data: book });
    };

    // Get a single book by ID
    getBookById = (req, res) => {
        const { headers } = req;
        if (headers.authorization) {
            const apiKeyParts = headers.authorization.split(" ");
            if (apiKeyParts[0] !== "Bearer" && apiKeyParts[1] !== API_KEY) {
                res.status(401).json({ message: "Not Valid API key" });
                return;
            }
        } else {
            res.status(400).json({
                message: "API key is missing"
            });
            return;
        }
        const bookId = req.params.bookId;

        const book = bookService.getBookById(bookId);
        res.status(200).json({ data: book });
    };

    // Update a single book by ID
    updateBook = (req, res) => {
        const bookId = req.params.bookId;
        const sanitizedData = sanitizeObj(BOOK_FIELDS, req.body);
        const book = bookService.updateBook(bookId, sanitizedData);

        if (book === "Error") {
            res.status(404).json({
                message: "Book with provided id does not exist"
            });
            return;
        }

        res.status(200).json({ data: book });
    };

    // Delete a single book by ID
    deleteBook = (req, res) => {
        const bookId = req.params.bookId;
        const book = bookService.deleteBook(bookId);
        res.status(204).send();

        if (book === "Error") {
            res.status(404).json({
                message: "Book with provided id does not exist"
            });
            return;
        }
    };

    // Get all reviews of a book
    getAllReviews = (req, res) => {
        const bookId = req.params.bookId;
        res.status(200).json({ data: books[bookId].reviews });
    };

    // Create a new review for a book
    createReview = (req, res) => {
        const bookId = req.params.bookId;
        const reviewData = req.body;
        const id = uuid();

        const newReview = {
            id,
            ...reviewData
        };
        books[bookId].reviews.push(newReview);
        res.status(201).json({ data: newReview });
    };

    // Get a single review of a book
    getReview = (req, res) => {
        const { bookId, reviewId } = req.params;

        const review = books[bookId].reviews.find((r) => r.id === reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ data: review });
    };

    // Delete a single review of a book
    deleteReview = (req, res) => {
        const { bookId, reviewId } = req.params;

        const reviewIndex = books[bookId].reviews.findIndex(
            (r) => r.id === reviewId
        );
        if (reviewIndex === -1) {
            return res.status(404).json({ message: "Review not found" });
        }
        books[bookId].reviews.splice(reviewIndex, 1);
        res.status(204).send();
    };
}

export const bookController = new BookController();
