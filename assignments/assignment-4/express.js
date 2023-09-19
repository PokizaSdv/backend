import { express } from "express";
import { stories } from "./data";
import { validate, v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

const PORT = 4400;

const newId = uuid();

// Get all stories
app.get("/stories", (req, res) => {
    res.status(200).json({ data: stories });
});

// Create a new Story
app.post("/stories", (req, res) => {
    const data = req.body;
    const id = uuid();
    const story = {
        id,
        ...data,
        tasks: {}
    };
    stories[id] = story;
    res.status(201).json({ data: story });
});

// Get Story by Id
app.get("/stories/:storyId", (req, res) => {
    const storyId = req.params.storyId;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }
    res.status(200).json({ data: stories[storyId] });
});

// Update Story by Id
app.put("/stories/:storyId", (req, res) => {
    const storyId = req.params.storyId;
    const updatedData = req.body;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }
    stories[storyId] = { ...stories[storyId], ...updatedData };
    res.status(200).json({ data: stories[storyId] });
});

// Delete story by Id
app.delete("/stories/:storyId", (req, res) => {
    const storyId = req.params.storyId;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }
    delete stories[storyId];
    res.status(204).send();
});

// Get all tasks by Story Id
app.get("/stories/:storyId/tasks", (req, res) => {
    const storyId = req.params.storyId;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }
    res.status(200).json({ data: stories[storyId].tasks });
});

// Create a New Task by story Id
app.post("/stories/:storyId/tasks", (req, res) => {
    const storyId = req.params.storyId;
    const taskData = req.body;
    const id = uuid();
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }
    const newTask = {
        id,
        ...taskData
    };
    stories[storyId].tasks = newTask;
    res.status(201).json({ data: newTask });
});

// Get A Single Task by Story Id's Task id
app.get("/stories/:storyId/tasks/:taskId", (req, res) => {
    const { storyId, taskId } = req.params;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }
    const task = stories[storyId].tasks.find((r) => r.id === taskId);
    if (!task) {
        return res.status(404).json({ message: "Subtask not found" });
    }
    res.status(200).json({ data: task });
});

// Update A task, by Story Id's Task Id
app.put("/stories/:storyId/tasks/:taskId", (req, res) => {
    const { storyId, taskId } = req.params;
    const { name, description, status } = req.body;

    if (!stories[storyId] || !stories[storyId].tasks[taskId]) {
        return res.status(404).json({ message: "Story or task not found." });
    }

    const task = stories[storyId].tasks[taskId];
    task.name = name || task.name;
    task.description = description || task.description;
    task.status = status || task.status;

    res.json({ message: "Task updated successfully.", task });
});

// Delete Task by Id
app.delete("/stories/:storyId/tasks/:taskId", (req, res) => {
    const { storyId, taskId } = req.params;

    if (!stories[storyId] || !stories[storyId].tasks[taskId]) {
        return res.status(404).json({ message: "Story or task not found." });
    }

    delete stories[storyId].tasks[taskId];

    res.json({ message: "Task deleted successfully." });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
