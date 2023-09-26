import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";

class AuthorService {
    async readFile() {
        try {
            const authorsObj = await fs.readFile("authors.json", "utf-8");
            const parsedData = JSON.parse(authorsObj);
            return parsedData.authors;
        } catch (error) {
            return error;
        }
    }
    async writefile(data) {
        try {
            const result = await fs.writeFile(
                "authors.json",
                JSON.stringify({ authors: data })
            );
            return result;
        } catch (error) {
            return error;
        }
    }

    async getAllAuthors() {
        const result = await this.readFile();
        return result;
    }

    async getAuthorById(authorId) {
        try {
            const authorsObj = await this.readFile();
            const result = authorsObj[authorId];
            return result;
        } catch (error) {
            return error;
        }
    }

    async createAnAuthor(data) {
        try {
            const authorsObj = await this.readFile();
            const id = uuid();
            const newAuthor = {
                id,
                ...data
            };

            authorsObj[id] = newAuthor;

            await this.writefile(authorsObj);
            return newAuthor;
        } catch (error) {
            return error;
        }
    }

    async updateAnAuthorById(authorId, data) {
        try {
            const authorsObj = await this.readFile();

            if (authorsObj.hasOwnProperty(authorId)) {
                const updatedAuthor = {
                    ...authorsObj[authorId],
                    ...data
                };
                authorsObj[authorId] = updatedAuthor;
                await this.writefile(authorsObj);
                return updatedAuthor;
            }
        } catch (error) {
            return error;
        }
    }
    async deleteAnAuthorById(authorId) {
        try {
            const authorsObj = await this.readFile();
            if (authorsObj.hasOwnProperty(authorId)) {
                delete authorsObj[authorId];
                await this.writefile(authorsObj);
                return "A Author was deleted";
            }
        } catch (error) {
            return error;
        }
    }
}

export const authorService = new AuthorService();
