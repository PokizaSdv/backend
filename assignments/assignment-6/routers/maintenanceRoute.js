import { Router } from "express";
import { maintenanceController } from "../controllers/maintenanceController.js";

const maintenanceRouter = Router();

maintenanceRouter.get("/", maintenanceController.getAllMaintenance);
maintenanceRouter.get(
    "/:maintenanceId",
    maintenanceController.getMaintenanceById
);
maintenanceRouter.post("/", maintenanceController.createMaintenance);
maintenanceRouter.put(
    "/:maintenanceId",
    maintenanceController.updateMaintenance
);
maintenanceRouter.delete(
    "/:maintenanceId",
    maintenanceController.deleteMaintenance
);

export { maintenanceRouter };
