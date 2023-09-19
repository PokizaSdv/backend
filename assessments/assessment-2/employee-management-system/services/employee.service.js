const fs = require("fs");
const path = require("path");

const dataPath = path.join("");
const getAllEmployees = () => {
    const rawData = fs.readFileSync(dataPath);
};
