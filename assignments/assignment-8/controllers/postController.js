import { postService } from "../services/postService.js";
import { promises as fs } from "fs";

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
            const post = await postService.getPostById(req.params.postId);
            res.status(200).json({ data: post });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    };
}

export const postController = new PostController();
