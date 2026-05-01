import { Router } from "express";

import {
  validateTaskId,
  validateTaskCreate,
} from "../middleware/validate-task.js";

const router = Router();

const TASKS = [];

router.get("/", (_req, res) => {
  res.json(TASKS);
});

router.post("/", validateTaskCreate, (req, res) => {
  const { title, description, priority } = req.body;

  const taskData = {
    id: TASKS.length + 1,
    title,
    description,
    priority,
    completed: false,
    createdAt: new Date(),
  };

  TASKS.push(taskData);

  res.json(taskData);
});

router.put("/:id", validateTaskId, (req, res) => {
  const { id } = req.params;
  const { title, description, priority } = req.body;

  const index = TASKS.findIndex((t) => t.id == id);
  if (index == -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updatedTaskData = {
    ...TASKS[index],
    title,
    description,
    priority,
  };

  TASKS[index] = updatedTaskData;

  res.json(updatedTaskData);
});

router.delete("/:id", validateTaskId, (req, res) => {
  const { id } = req.params;

  const index = TASKS.findIndex((t) => t.id == id);
  if (index == -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  TASKS.splice(index, 1);

  res.json({ message: "Task was deleted" });
});

router.patch("/:id/toggle", validateTaskId, (req, res) => {
  const { id } = req.params;

  const index = TASKS.findIndex((t) => t.id == id);
  if (index == -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updatedTaskData = {
    ...TASKS[index],
    completed: !TASKS[index].completed,
  };

  TASKS[index] = updatedTaskData;

  res.json({ message: "Task was toggled" });
});

export default router;
