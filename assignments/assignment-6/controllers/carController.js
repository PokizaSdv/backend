import { cars } from "../data.js";

import { validate, v4 as uuid } from "uuid";

class CarController {
    getAllCars = (req, res) => {
        res.status(200).json(cars);
    };

    getCarById = (req, res) => {
        const { carId } = req.params;
        if (!validate(carId) && !cars[carId]) {
            res.status(400).json({ message: "Invalid Car Id" });
        }
        res.status(200).json({ data: cars[carId] });
    };

    createACar = (req, res) => {
        const newCarData = req.body;
        const id = uuid();
        const newCar = {
            id,
            ...newCarData
        };
        cars[id] = newCar;
        res.status(201).json({ newCar: newCar });
    };

    updateCar = (req, res) => {
        const { carId } = req.params;
        const updatedData = req.body;
        if (!validate(carId) && cars[carId]) {
            res.status(400).json({ message: "Invalid Car Id" });
        }

        cars[carId] = { ...cars[carId], ...updatedData };

        res.status(200).json(cars[carId]);
    };

    deleteCar = (req, res) => {
        const { carId } = req.params;
        if (!validate(carId) && !cars[carId]) {
            res.status(400).json({ message: "Invalid Car Id" });
        }
        delete cars[carId];
        res.status(204).send();
    };
}

export const carController = new CarController();
