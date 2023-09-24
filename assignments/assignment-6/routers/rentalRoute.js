import { Router } from "express";

import { rentalController } from "../controllers/rentalController.js";

const rentalRouter = Router();

rentalRouter.get("/", rentalController.getAllRentals);
rentalRouter.get("/:rentalId", rentalController.getRentalById);
rentalRouter.post("/", rentalController.createRental);
rentalRouter.put("/:rentalId", rentalController.updateRental);
rentalRouter.delete("/:rentalId", rentalController.deleteRental);

export { rentalRouter };
