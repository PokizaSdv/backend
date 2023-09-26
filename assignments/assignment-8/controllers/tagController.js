import { tagService } from "../services/tag.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { TAG_FIELDS } from "../const/allowedFields.js";

class TagController {
    async getAllTags(req, res) {
        try {
            const allTags = await tagService.getAllTags();
            res.status(200).json({ tags: allTags });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async getTagById(req, res) {
        try {
            const tagId = req.params.tagId;
            const tag = await tagService.getTagById(tagId);
            res.status(200).json({ tag: tag });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async createAnTag(req, res) {
        try {
            const data = sanitizedObj(TAG_FIELDS, req.body);
            const newTag = await tagService.createAnTag(data);
            res.status(201).json({ newTag: newTag });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async updateAnTagById(req, res) {
        try {
            const data = sanitizedObj(TAG_FIELDS, req.body);
            const tagId = req.params.tagId;
            const updatedTag = await tagService.updateAnTagById(tagId, data);
            res.status(200).json({ updatedTag: updatedTag });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
    async deleteAnTagById(req, res) {
        try {
            const tagId = req.params.tagId;
            const deletedTag = await tagService.deleteAnTagById(tagId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export const tagController = new TagController();
