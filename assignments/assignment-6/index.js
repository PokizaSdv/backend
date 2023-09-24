import express from "express";
import { carRouter } from "./routers/carRoute.js";
import { maintenanceRouter } from "./routers/maintenanceRoute.js";
import { rentalRouter } from "./routers/rentalRoute.js";

const app = express();
app.use(express.json());

const PORT = 6000;

app.use("/cars", carRouter);
app.use("/maintenance", maintenanceRouter);
app.use("/rentals", rentalRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
