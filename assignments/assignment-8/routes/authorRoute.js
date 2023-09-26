import { Router } from "express";
import { authorController } from "../controllers/author.controller.js";

const authorRouter = new Router();

authorRouter.get("/", authorController.getAllAuthors);
authorRouter.get("/:authorId", authorController.getAuthorById);
authorRouter.post("/", authorController.createAnAuthor);
authorRouter.put("/:authorId", authorController.updateAnAuthorById);
authorRouter.delete("/:authorId", authorController.deleteAnAuthorById);

export { authorRouter };
