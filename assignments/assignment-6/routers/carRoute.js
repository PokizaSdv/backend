import { Router } from "express";
import { carController } from "../controllers/carController.js";

const carRouter = Router();

carRouter.get("/", carController.getAllCars);
carRouter.get("/:carId", carController.getCarById);
carRouter.post("/", carController.createACar);
carRouter.put("/:carId", carController.updateCar);
carRouter.delete("/:carId", carController.deleteCar);

export { carRouter };
