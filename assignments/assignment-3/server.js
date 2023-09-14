const http = require("http");
const { v4: uuid, validate } = require("uuid");

const port = 4001;
const host = "localhost";

const newId = uuid();

const parseId = (path, level) => {
    const parts = path.split("/");
    return parts[level];
};

const verifyPathMatch = (path, pattern) => {
    const parts = path.split("/");
    // Implement your logic
    return (
        parts.length === pattern && parts[1] === "stories" && validate(parts[2])
    );
};

const verifyPathMatch2 = (path, pattern) => {
    const parts = path.split("/");
    // Implement your logic
    return (
        parts.length === pattern &&
        parts[1] === "stories" &&
        parts[2] === "tasks" &&
        validate(parts[3])
    );
};

const stories = {
    "uuid-story-1": {
        id: "uuid-story-1",
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
    "uuid-story-2": {
        id: "uuid-story-2",
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

const getAllStories = (res) => {
    // Code to return all stories

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(stories));
};

const createStory = (req, res) => {
    // Code to create a new story

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

const getStory = (req, res) => {
    // Code to get a single story

    const id = parseId(req.url, 2);
    const story = stories[id];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(story));
};

const updateStoryStatus = (req, res) => {
    // Code to update a story's status

    let body = [];
    req.on("data", (chunk) => {
        body.push(chunk);
    });
    req.on("end", () => {
        body = JSON.parse(Buffer.concat(body));
        const id = parseId(req.url, 2);

        stories[id].status = body.status;

        res.statusCode = 204;
        res.end();
    });
};

const deleteStory = (req, res) => {
    // Code to delete a story

    const id = parseId(req.url, 2);
    delete stories[id];
    res.statusCode = 200;
    res.end();
};

const getAllSubtasks = (res) => {
    const allSubTasks = {};

    for (const storyId in stories) {
        const story = stories[storyId];

        const tasksObj = story.tasks;

        for (const taskId in tasksObj) {
            const task = tasksObj[taskId];

            allSubTasks[newId] = task;
        }
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(allSubTasks));
};

const createSubtask = (req, res) => {
    // Code to create a new subtask

    const allSubTasks = {};

    for (const storyId in stories) {
        const story = stories[storyId];

        const tasksObj = story.tasks;

        for (const taskId in tasksObj) {
            const task = tasksObj[taskId];

            // allSubTasks[newId] = task;

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
                allSubTasks[newId] = newTask;
            });
        }
        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify(newTask));
    }
};

const updateSubtaskStatus = (req, res) => {
    // Code to update a subtask's status
    for (const storyId in stories) {
        const story = stories[storyId];

        const tasksObj = story.tasks;

        for (const taskId in tasksObj) {
            const task = tasksObj[taskId];
        }
    }

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

const getSubtask = (req, res) => {
    // Code to update a subtask's status
    for (const storyId in stories) {
        const story = stories[storyId];

        const tasksObj = story.tasks;

        for (const taskId in tasksObj) {
            const task = tasksObj[taskId];
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(task));
        }
    }
};

const deleteSubtask = (req, res) => {
    // Code to delete a subtask
    for (const storyId in stories) {
        const story = stories[storyId];

        const tasksObj = story.tasks;

        for (const subtaskId in tasksObj) {
            const subtask = tasksObj[subtaskId];
            delete subtask;
            res.statusCode = 200;
            res.end();
        }
    }
};

const server = http.createServer((req, res) => {
    // Routing logic

    const isPathMatch = verifyPathMatch(req.url, 3);

    if (req.url === "/stories" && req.method === "GET") {
        getAllStories(res);
    } else if (req.url === "/stories/tasks" && req.method === "GET") {
        getAllSubtasks(res);
    } else if (req.url === "/stories/tasks" && req.method === "POST") {
        createSubtask(req, res);
    } else if (req.url === "/stories" && req.method === "POST") {
        createStory(req, res);
    } else if (isPathMatch && req.method === "PATCH") {
        updateStoryStatus(req, res);
    } else if (isPathMatch && req.method === "PATCH") {
        updateSubtaskStatus(req, res);
    } else if (isPathMatch && req.method === "GET") {
        getStory(req, res);
    } else if (isPathMatch && req.method === "DELETE") {
        deleteStory(req, res);
    } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Wrong Address");
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
