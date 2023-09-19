const http = require("http");
const { v4: uuid, validate } = require("uuid");

const port = 4000;
const host = "localhost";

const newId = uuid();

const parseId = (path, level) => {
    const parts = path.split("/");
    return parts[level];
};

const verifyPathMatch = (path, pattern) => {
    const parts = path.split("/");
    return (
        parts.length === pattern && parts[1] === "stories" && validate(parts[2])
    );
};

const verifyPathMatch2 = (path, pattern) => {
    const parts = path.split("/");
    return (
        parts.length === pattern &&
        parts[1] === "stories" &&
        parts[2] === "tasks" &&
        validate(parts[3])
    );
};

const stories = {
    1: {
        id: 1,
        name: "Story 1",
        description: "Description for Story 1",
        status: "Todo", // "Todo", "InProgress", "InQA", "Done"
        tasks: {
            "uuid-task-1": {
                id: "uuid-task-1",
                name: "Sub-task 1",
                description: "Description for Sub-task 1",
                status: "Todo" // "Todo", "InProgress", "Done"
            },
            "uuid-task-2": {
                id: "uuid-task-2",
                name: "Sub-task 2",
                description: "Description for Sub-task 2",
                status: "InProgress" // "Todo", "InProgress", "Done"
            }
        }
    },
    2: {
        id: 2,
        name: "Story 2",
        description: "Description for Story 2",
        status: "InProgress", // "Todo", "InProgress", "InQA", "Done"
        tasks: {
            "uuid-task-3": {
                id: "uuid-task-3",
                name: "Sub-task 3",
                description: "Description for Sub-task 3",
                status: "Done" // "Todo", "InProgress", "Done"
            }
        }
    }
};

// Get All Stories
const getAllStories = (res) => {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(stories));
};

// Create A New Story
const createStory = (req, res) => {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = JSON.parse(Buffer.concat(body));
        const newStory = {
            id: newId,
            name: body.name,
            description: body.description,
            status: body.status,
            tasks: {}
        };
        stories[newId] = newStory;

        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify(newStory));
    });
};

// Get Single Story by Id
const getStory = (req, res) => {
    const storyId = parseId(req.url, 2);
    const story = stories[storyId];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(story));
};

// Update Story Status by Id
const updateStoryStatus = (req, res) => {
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = JSON.parse(Buffer.concat(body));
        const storyId = parseId(req.url, 2);

        stories[storyId].status = body.status;

        res.statusCode = 204;
        res.end();
    });
};

// Delete Story by Id
const deleteStory = (req, res) => {
    const storyId = parseId(req.url, 2);
    delete stories[storyId];
    res.statusCode = 200;
    res.end();
};

// Get All Tasks by Story Id
const getAllSubtasks = (res) => {
    const storyId = parseId(req.url, 2);
    const story = stories[storyId];

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(story.tasks));
};

// Create A new Task by Story Id
const createSubtask = (req, res) => {
    const storyId = parseId(req.url, 2);
    const story = stories[storyId];
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = JSON.parse(Buffer.concat(body));
        const newTask = {
            id: newId,
            name: body.name,
            description: body.description,
            status: body.status
        };
        story[newTask] = newTask;
    });
    res.writeHead(201, { "content-type": "application/json" });
    res.end(JSON.stringify(newTask));
};

// Update task Status by Story Id's, task Id
const updateSubtaskStatus = (req, res) => {
    const storyId = parseId(req.url, 2);
    const story = stories[storyId];
    const taskId = parseId(req.url, 4);
    const task = story[taskId];
    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = JSON.parse(Buffer.concat(body));
        task.status = body.status;

        res.statusCode = 204;
        res.end();
    });
};

// Get a Story's Single Subtask by id
const getSubtask = (req, res) => {
    const storyId = parseId(req.url, 2);
    const story = stories[storyId];
    const taskId = parseId(req.url, 4);
    const task = story[taskId];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(task));
};

// Delete Story's Task by Id
const deleteSubtask = (req, res) => {
    const storyId = parseId(req.url, 2);
    const story = stories[storyId];
    const taskId = parseId(req.url, 4);
    const task = story[taskId];

    delete task;
    res.statusCode = 200;
    res.end();
};

const server = http.createServer((req, res) => {
    const isPathMatchStories = verifyPathMatch(req.url, 3);
    const isPathMatchTasks = verifyPathMatch2(req.url, 4);

    if (req.url === "/stories" && req.method === "GET") {
        getAllStories(res);
    } else if (req.url === "/stories" && req.method === "POST") {
        createStory(req, res);
    } else if (isPathMatchStories && req.method === "GET") {
        getStory(req, res);
    } else if (isPathMatchStories && req.method === "PATCH") {
        updateStoryStatus(req, res);
    } else if (isPathMatchStories && req.method === "DELETE") {
        deleteStory(req, res);
    } else if (req.url === "/stories/tasks" && req.method === "GET") {
        getAllSubtasks(res);
    } else if (req.url === "/stories/tasks" && req.method === "POST") {
        createSubtask(req, res);
    } else if (isPathMatchTasks && req.method === "PATCH") {
        updateSubtaskStatus(req, res);
    } else if (isPathMatchTasks && req.method === "GET") {
        getSubtask(req, res);
    } else if (isPathMatchTasks && req.method === "DELETE") {
        deleteSubtask(req, res);
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Wrong Address");
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
