const http = require("http");
const { v4: uuid } = require("uuid");

const port = 4040;
const host = "localhost";

const applications = {
    application: {}
};

const parseId = (path, level) => {
    const parts = path.split("/");
    return parts[level];
};

const verifyPathMatch = (path, pattern) => {
    const parts = path.split("/");
    return parts.length === pattern;
};
const newId = uuid();

const getAllAplications = (res) => {
    res.writeHead(200, { "Content-Type": "Application/json" });
    res.end(JSON.stringify(applications));
};

const createApplication = (req, res) => {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = JSON.parse(Buffer.concat(body));
        const newApplication = {
            id: newId,
            companyName: body.companyName,
            recruiterName: body.recruiterName,
            position: body.position,
            appliedData: body.appliedData,
            status: body.status // "Applied", "Not Selected", "Initial Call", "Technichal Interview", "Final Round", "Offer"
        };
        applications[newId] = newApplication;

        res.writeHead(201, { "Content-type": "Application/json" });
        res.end(JSON.stringify(newApplication));
    });
};

const getApplication = (req, res) => {
    const id = parseId(req.url, 2);
    const application = applications[id];

    res.writeHead(200, { "Content-type": "Application/json" });
    res.end(JSON.stringify(application));
};

const updateApplicationStatus = (req, res) => {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body.JSON.parse(Buffer.concat(body));
        const id = parseId(req.url, 2);

        applications[id].status = body.status;

        res.statusCode = 204;
        res.end();
    });
};

const deleteApplication = (req, res) => {
    const id = parseId(req.url, 2);
    delete applications[id];

    res.statusCode = 200;
    res.end();
};

const server = http.createServer((req, res) => {
    const isPathMatch = verifyPathMatch(req.url);

    if (req.url === "/applications" && req.method === "GET") {
        getAllAplications(res);
    } else if (req.url === "/applications" && req.method === "POST") {
        createApplication(req, res);
    } else if (isPathMatch && req.method === "PATCH") {
        updateApplicationStatus(req, res);
    } else if (isPathMatch && req.method === "GET") {
        getApplication(req, res);
    } else if (isPathMatch && req.method === "DELETE") {
        deleteApplication(req, res);
    } else {
        res.writeHead(404, { "Content-type": "Application/json" });
        res.end("Wrong Address");
    }
});

server.listen(port, host, () => {
    console.log(`Server is running at http: //${host}:${port}`);
});
