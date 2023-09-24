import { maintenance } from "../data.js";
import { validate, v4 as uuid } from "uuid";

class MaintenanceController {
    getAllMaintenance = (req, res) => {
        res.status(200).json(maintenance);
    };

    getMaintenanceById = (req, res) => {
        const { maintenanceId } = req.params;
        if (!validate(maintenanceId) && !maintenance[maintenanceId]) {
            res.status(400).json({ message: "Invalid Maintenance Id" });
        }
        res.status(200).json(maintenance[maintenanceId]);
    };

    createMaintenance = (req, res) => {
        const newMaintenanceData = req.body;
        const id = uuid();
        const newMaintenance = {
            id,
            ...newMaintenanceData
        };
        maintenance[id] = newMaintenance;
        res.status(201).json(newMaintenance);
    };

    updateMaintenance = (req, res) => {
        const { maintenanceId } = req.params;
        const updateMaintenanceData = req.body;
        if (!validate(maintenanceId) && !maintenance[maintenanceId]) {
            res.status(400).json({ message: "Invalid Car Id" });
        }

        maintenance[maintenanceId] = {
            ...maintenance[maintenanceId],
            ...updateMaintenanceData
        };
        res.status(200).json(maintenance[maintenanceId]);
    };

    deleteMaintenance = (req, res) => {
        const { maintenanceId } = req.params;
        if (!validate(maintenanceId) && !maintenance[maintenanceId]) {
            res.status(400).json({ message: "Invalid Maintenance Id" });
        }
        delete maintenance[maintenanceId];
        res.status(204).send();
    };
}

export const maintenanceController = new MaintenanceController();
