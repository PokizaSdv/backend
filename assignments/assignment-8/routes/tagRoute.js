import { Router } from "express";
import { tagController } from "../controllers/tag.controller.js";

const tagRouter = new Router();

tagRouter.get("/", tagController.getAllTags);
tagRouter.get("/:tagId", tagController.getTagById);
tagRouter.post("/", tagController.createAnTag);
tagRouter.put("/:tagId", tagController.updateAnTagById);
tagRouter.delete("/:tagId", tagController.deleteAnTagById);

export { tagRouter };
