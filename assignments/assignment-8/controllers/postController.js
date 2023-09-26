import { postService } from "../services/postService.js";
import { promises as fs } from "fs";
import { sanitizedObj } from "../utils/sanitizeObj";
import { POST_FIELDS } from "../const/allowedFields.js";

class PostController {
    getAllPosts = async (req, res) => {
        try {
            const posts = await postService.getAllPosts();
            res.status(200).json({ data: posts });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    };

    getPostById = async (req, res) => {
        try {
            const postId = req.params.postId;
            const post = await postService.getPostById(postId);
            res.status(200).json({ data: post });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    };

    async updateAPostById(req, res) {
        try {
            const data = sanitizedObj(POST_FIELDS, req.body);
            const postId = req.params.postId;
            const updatedPost = await postService.updateAPostById(postId, data);
            res.status(200).json({ updatedPost: updatedPost });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    async deleteAPostById(req, res) {
        try {
            const postId = req.params.postId;
            const deletedPost = await postService.deleteAPostById(postId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export const postController = new PostController();
