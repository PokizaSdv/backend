import { authorService } from "../services/author.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { AUTHOR_FIELDS } from "../const/allowedFields.js";

class AuthorController {
    async getAllAuthors(req, res) {
        try {
            const allAuthors = await authorService.getAllAuthors();
            res.status(200).json({ authors: allAuthors });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async getAuthorById(req, res) {
        try {
            const authorId = req.params.authorId;
            const author = await authorService.getAuthorById(authorId);
            res.status(200).json({ author: author });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async createAnAuthor(req, res) {
        try {
            const data = sanitizedObj(AUTHOR_FIELDS, req.body);
            const newAuthor = await authorService.createAnAuthor(data);
            res.status(201).json({ newAuthor: newAuthor });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async updateAnAuthorById(req, res) {
        try {
            const data = sanitizedObj(AUTHOR_FIELDS, req.body);
            const authorId = req.params.authorId;
            const updatedAuthor = await authorService.updateAnAuthorById(
                authorId,
                data
            );
            res.status(200).json({ updatedAuthor: updatedAuthor });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async deleteAnAuthorById(req, res) {
        try {
            const authorId = req.params.authorId;
            const deletedAuthor = await authorService.deleteAnAuthorById(
                authorId
            );
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export const authorController = new AuthorController();
