const fs = require("fs");
const http = require("http");
const { v4: uuid } = require("uuid");
const express = require("express");

const app = express();
app.use(express.json());

const PORT = 6000;

app.use("/employees", require("./routes/employee.routes.js"));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
