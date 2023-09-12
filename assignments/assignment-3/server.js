const http = require("http");
const fs = require("fs");
const { v4: uuid, validate } = require("uuid");

const host = "localhost";
const port = 4000;

const parseId = (path, level) => {
    const parts = path.split("/");
    return parts[level];
};

const verifyPatMatch = (path, pattern) => {
    const parts = path.split("/");
    return (
        parts.length === pattern && parts[1] === "stories" && validate[parts[2]]
    );
};

const stories = {
    "uuid-story-1": {
        id: "uuid-story-1",
        name: "Story 1",
        description: "Description for Story 1",
        status: "Todo",
        tasks: {
            "uuid-task-1": {
                id: "uuid-task-1",
                name: "Sub-task 1",
                description: "Description for Sub-task 1",
                status: "Todo"
            },
            "uuid-task-2": {
                id: "uuid-task-2",
                name: "Sub-task 2",
                description: "Description for Sub-task 2",
                status: "InProgress"
            }
        }
    },
    "uuid-story-2": {
        id: "uuid-story-2",
        name: "Story 2",
        description: "Description for Story 2",
        status: "InProgress",
        tasks: {
            "uuid-task-3": {
                id: "uuid-task-3",
                name: "Sub-task 3",
                description: "Description for Sub-task 3",
                status: "Done"
            }
        }
    }
};
const getAllStories = (res) => {
    // Code to return all stories
};

const createStory = (req, res) => {
    // Code to create a new story
};

const getStory = (req, res) => {
    // Code to get a single story
};

const updateStoryStatus = (req, res) => {
    // Code to update a story's status
};

const deleteStory = (req, res) => {
    // Code to delete a story
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify((stories[newId] = stories[task].id)));
};

const getAllSubtasks = (req, res) => {
    // Code to return all subtasks for a story
};

const createSubtask = (req, res) => {
    // Code to create a new subtask
};

const updateSubtaskStatus = (req, res) => {
    // Code to update a subtask's status
};

const getSubtask = (req, res) => {
    // Code to update a subtask's status
};

const deleteSubtask = (req, res) => {
    // Code to delete a subtask
};

const server = http.createServer((req, res) => {
    // Placeholder functions verifyPathMatchStories and verifyPathMatchTasks are assumed to be defined
    const isPathMatchStories = verifyPathMatchStories(req.url, "/stories");
    const isPathMatchTasks = verifyPathMatchTasks(req.url, "/tasks");

    // Routing for Stories
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
    }

    // Routing for Subtasks
    else if (isPathMatchTasks && req.method === "GET") {
        getAllSubtasks(req, res);
    } else if (isPathMatchTasks && req.method === "POST") {
        createSubtask(req, res);
    } else if (isPathMatchTasks && req.method === "GET") {
        getSubtask(req, res);
    } else if (isPathMatchTasks && req.method === "PATCH") {
        updateSubtaskStatus(req, res);
    } else if (isPathMatchTasks && req.method === "DELETE") {
        deleteSubtask(req, res);
    }

    // If none of the endpoints match
    else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Wrong Address");
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
