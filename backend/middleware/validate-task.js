const ALLOWED_PRIORITIES = ["low", "medium", "high"];

function validateTaskData(title, description, priority) {
  const errors = [];

  if (typeof title != "string" || title.trim().length < 3) {
    errors.push("title must be at least 3 characters long");
  }

  if (typeof description != "string") {
    errors.push("description must be a string");
  }

  if (!ALLOWED_PRIORITIES.includes(priority)) {
    errors.push(
      `priority must be either of these: ${ALLOWED_PRIORITIES.join(", ")}`,
    );
  }

  return errors;
}

export function validateTaskCreate(req, res, next) {
  const { title, description, priority } = req.body;

  const errors = validateTaskData(title, description, priority);

  if (errors.length) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  next();
}

export function validateTaskId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  req.taskId = id;
  next();
}
