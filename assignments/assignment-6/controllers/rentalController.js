import { rentals } from "../data.js";
import { validate, v4 as uuid } from "uuid";

class RentalController {
    getAllRentals = (req, res) => {
        res.status(200).json(rentals);
    };

    getRentalById = (req, res) => {
        const { rentalId } = req.params;
        if (!validate(rentalId) && !rentals[rentalId]) {
            res.status(400).json({ message: "Invalid Rental Id" });
        }
        res.status(200).json(rentals[rentalId]);
    };

    createRental = (req, res) => {
        const newRentalData = req.body;
        const id = uuid();
        const newRental = {
            id: uuid(),
            ...newRentalData
        };
        rentals[id] = newRental;

        res.status(201).json({ newRental: newRental });
    };

    updateRental = (req, res) => {
        const { rentalId } = req.params;
        const updatedRentalData = req.body;
        if (!validate(rentalId) && !rentals[rentalId]) {
            res.status(400).json({ message: "Invalid Rental Id" });
        }
        rentals[rentalId] = {
            ...rentals[rentalId],
            ...updatedRentalData
        };

        res.status(200).json(rentals[rentalId]);
    };

    deleteRental = (req, res) => {
        const { rentalId } = req.params;
        delete rentals[rentalId];
        res.status(204).json(rentals[rentalId]);
    };
}

export const rentalController = new RentalController();
