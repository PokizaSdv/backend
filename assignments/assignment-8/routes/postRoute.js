import { Router } from "express";
import { postController } from "../controllers/post.controller.js";

const postRouter = new Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:postId", postController.getPostById);
postRouter.post("/", postController.createAPost);
postRouter.put("/:postId", postController.updateAPostById);
postRouter.delete("/:postId", postController.deleteAPostById);

export { postRouter };
