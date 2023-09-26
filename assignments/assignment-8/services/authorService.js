import { v4 as uuid } from "uuid";
import fs from "fs";
const fs = require("fs").promises;

class AuthorService {
    readAndParseFile = async () => {
        try {
            const data = await fs.readFile("author.json", "utf-8");
            const parsedData = JSON.parse(data);
            console.log(parsedData);
        } catch (err) {
            console.log(err);
        }
    };
    getAllAuthors() {
        return this.readAndParseFile();
    }
}

export const authorService = new AuthorService();
