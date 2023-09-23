import { books } from "../data.js";
import { validate, v4 as uuid } from "uuid";

const API_KEY = "qwerty%%$$@@123456uiopasdfghjkl";

class BookController {
    // Get all books (with optional genre filter)
    getAllBooks = (req, res) => {
        const genre = req.query.genre;
        let filteredBooks = Object.values(books);
        if (genre) {
            filteredBooks = filteredBooks.filter(
                (book) => book.genre === genre
            );
        }
        res.status(200).json({ data: filteredBooks });
    };

    // Create a new book
    createABook = (req, res) => {
        const data = req.body;
        const id = uuid();
        const book = {
            id,
            ...data,
            reviews: []
        };
        books[id] = book;
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
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
        res.status(200).json({ data: books[bookId] });
    };

    // Update a single book by ID
    updateBook = (req, res) => {
        const bookId = req.params.bookId;
        const updatedData = req.body;
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
        books[bookId] = { ...books[bookId], ...updatedData };
        res.status(200).json({ data: books[bookId] });
    };

    // Delete a single book by ID
    deleteBook = (req, res) => {
        const bookId = req.params.bookId;
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
        delete books[bookId];
        res.status(204).send();
    };

    // Get all reviews of a book
    getAllReviews = (req, res) => {
        const bookId = req.params.bookId;
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
        res.status(200).json({ data: books[bookId].reviews });
    };

    // Create a new review for a book
    createReview = (req, res) => {
        const bookId = req.params.bookId;
        const reviewData = req.body;
        const id = uuid();
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
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
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
        const review = books[bookId].reviews.find((r) => r.id === reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ data: review });
    };

    // Delete a single review of a book
    deleteReview = (req, res) => {
        const { bookId, reviewId } = req.params;
        if (!validate(bookId) || !books[bookId]) {
            return res.status(400).json({ message: "Not a valid book ID" });
        }
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
