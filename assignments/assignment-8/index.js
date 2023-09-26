import express from "express";
// import { authorRouter } from "./routes/authorRoute.js";
import { postRouter } from "./routes/postRoute.js";
// import { tagRouter } from "./routes/tagRoute.js";

const app = express();
app.use(express.json());

const PORT = 8000;

// app.use("/authors", authorRouter);
app.use("/posts", postRouter);
// app.use("/tags", tagRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
