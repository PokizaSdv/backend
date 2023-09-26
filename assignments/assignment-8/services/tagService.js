import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";

class TagService {
    async readFile() {
        try {
            const tagsObj = await fs.readFile("tags.json", "utf-8");
            const parsedData = JSON.parse(tagsObj);
            return parsedData.tags;
        } catch (error) {
            return error;
        }
    }
    async writefile(data) {
        try {
            const result = await fs.writeFile(
                "tags.json",
                JSON.stringify({ tags: data })
            );
            return result;
        } catch (error) {
            return error;
        }
    }

    async getAllTags() {
        const result = await this.readFile();
        return result;
    }

    async getTagById(tagId) {
        try {
            const tagsObj = await this.readFile();
            const result = tagsObj[tagId];
            return result;
        } catch (error) {
            return error;
        }
    }

    async createAnTag(data) {
        try {
            const tagsObj = await this.readFile();
            const id = uuid();
            const newTag = {
                id,
                ...data
            };

            tagsObj[id] = newTag;

            await this.writefile(tagsObj);
            return newTag;
        } catch (error) {
            return error;
        }
    }

    async updateAnTagById(tagId, data) {
        try {
            const tagsObj = await this.readFile();

            if (tagsObj.hasOwnProperty(tagId)) {
                const updatedTag = {
                    ...tagsObj[tagId],
                    ...data
                };
                tagsObj[tagId] = updatedTag;
                await this.writefile(tagsObj);
                return updatedTag;
            }
        } catch (error) {
            return error;
        }
    }
    async deleteAnTagById(tagId) {
        try {
            const tagsObj = await this.readFile();
            if (tagsObj.hasOwnProperty(tagId)) {
                delete tagsObj[tagId];
                await this.writefile(tagsObj);
                return "A Tag was deleted";
            }
        } catch (error) {
            return error;
        }
    }
}

export const tagService = new TagService();
