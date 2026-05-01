import { DialogContent } from "../Dialog";
import { useDialog } from "../../hooks/use-dialog";
import { TaskForm } from "./Form";

export function TaskItem({ task, onToggle, onDelete, onTaskUpdated }) {
  const { dialogRef, isOpen, openDialog, closeDialog } = useDialog();

  return (
    <article className="task-item">
      <div className="task-item-head">
        <h3>{task.title}</h3>
        <span className={`task-priority ${task.priority}`}>
          {task.priority}
        </span>
      </div>
      <p>{task.description}</p>
      <div className="task-item-meta">
        <small>{new Date(task.createdAt).toLocaleString()}</small>
        <small>{task.completed ? "Completed" : "In progress"}</small>
      </div>
      <div className="task-item-actions">
        <button
          type="button"
          className="task-action-button"
          onClick={openDialog}
        >
          Edit
        </button>
        <button type="button" className="task-action-button" onClick={onToggle}>
          {task.completed ? "Mark Active" : "Mark Done"}
        </button>
        <button
          type="button"
          className="task-action-button danger"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      <DialogContent dialogRef={dialogRef} onClose={closeDialog}>
        <h2>Edit Task</h2>
        <TaskForm
          isOpen={isOpen}
          closeDialog={closeDialog}
          onTaskCreated={onTaskUpdated}
          taskToEdit={task}
        />
      </DialogContent>
    </article>
  );
}
