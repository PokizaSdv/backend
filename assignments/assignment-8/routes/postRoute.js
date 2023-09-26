import { Router } from "express";
import { postController } from "../controllers/postController.js";

const postRouter = Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:postId", postController.getPostById);
postRouter.post("/");
postRouter.put("/:postId");
postRouter.delete("/:postId");

export { postRouter };
