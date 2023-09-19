// When we are (client) sending a request to get any data, API will require authorization to send response back to us.

// Now we gonna learn how to create authorizqation:
// we keep our data in request body. But Authorization should be in request Headers.

// First We have to create API-KEY in our vsCode index file after specifying app and port to variables:

// Then, in the frontend or postman, suppose to go through headers and create key-value authorization:
//  Key: authorization (api-key);
// Value: Bearer qwerty123456%%$$@@uiopasdfghjkl (API_KEY In the VsCode );

// Then, suppose to go each operator (method), and specify authorization:
// line number

import express from "express";
import { books } from "./book-app-api-express/data.js";
import { validate, v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

const PORT = 5000;

const API_KEY = "qwerty123456%%$$@@uiopasdfghjkl";

// Get all books (with optional genre filter)
app.get("/books", (req, res) => {
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
    const genre = req.query.genre;
    let filteredBooks = Object.values(books);
    if (genre) {
        filteredBooks = filteredBooks.filter((book) => book.genre === genre);
    }
    res.status(200).json({ data: filteredBooks });
});
// Other Methods
