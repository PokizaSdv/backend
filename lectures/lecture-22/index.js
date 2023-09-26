import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
// import dotenv from "dotenv";
import { todoRouter } from "./routes/todoRoute.js";

const app = express();
app.use(express.json());
const PORT = 3000;

// const dbUrl = "mongodb://localhost:27017";
const dbUrl =
    "mongodb+srv://Pokizasdv:Pokiza94@lectures.u022qds.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(dbUrl, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

let db;
const initDb = async () => {
    try {
        await client.connect();
        db = client.db("lecture-22");
        console.log("DB is connected");
    } catch (err) {
        console.log("Some err", err);
    }
};

initDb();

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use("/todos", todoRouter);

app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});
