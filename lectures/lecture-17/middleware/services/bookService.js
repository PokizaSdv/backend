import { books } from "../data.js";

class BookService {
    getAllBooks(query) {
        const { genre } = query;
        let filteredBooks = Object.values(books);
        if (genre) {
            filteredBooks = filteredBooks.filter(
                (book) => book.genre === genre
            );
        }
        return filteredBooks;
    }

    createABook(data) {
        const id = uuid();
        const book = {
            id,
            ...data,
            reviews: []
        };
        books[id] = book;
        return book;
    }

    getBookById(bookId) {
        return books[bookId];
    }

    updateBook(bookId, data) {
        const book = book[bookId];
        if (book) {
            books[bookId] = { ...books[bookId], ...data };
            return books[bookId];
        } else {
            return "Error";
        }
    }

    deleteBook(bookId) {
        const book = book[bookId];
        if (book) {
            delete books[bookId];
        } else {
            return "Error";
        }
    }
}

export const bookService = new BookService();
