const http = require("http");
const { v4: uuid } = require("uuid");

const todos = {
    // 1: {
    //     id: 1,
    //     task: "Some text",
    //     status: "Todo"
    // }
};

const port = 3030;
const host = "localhost";

const parseId = (path) => {
    const parts = path.split("/");
    return parts[2];
};
const verifyPathMatch = (path) => {
    return path.split("/").lenth === 3;
};

const server = http.createServer((req, res) => {
    const isPathMatch = verifyPathMatch(req.url);
    if (req.method === "GET" && req.url === "/todos") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(Object.values(todos)));
    } else if (req.method === "POST" && req.url === "/todos") {
        let body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        req.on("end", () => {
            body = JSON.parse(Buffer.concat(body));
            const newId = uuid();
            const newTodo = {
                id: newId,
                task: body.task,
                status: body.status
            };
            todos[newId] = newTodo;

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newTodo));
        });
    } else if (req.method === "PATCH" && isPathMatch) {
        let body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        req.on("end", () => {
            body = JSON.parse(Buffer.concat(body));
            const id = parseId(req.url);

            todos[id].status = body.status;
            res.statusCode = 204;
            res.end();
        });
    } else if (req.method === "GET" && isPathMatch) {
        const id = parseId(req.url);
        const todo = todos[id];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todo));
    } else if (req.method === "DELETE" && isPathMatch) {
        const id = parseId(req.url);
        delete todos[id];
        res.statusCode = 200;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log("I am runing on", port, host);
});
