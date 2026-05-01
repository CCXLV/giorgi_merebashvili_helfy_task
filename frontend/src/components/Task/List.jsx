import { TaskItem } from "./Item";

export function TaskList({ tasks, onToggleTask, onDeleteTask, onTaskUpdated }) {
  if (!tasks.length) {
    return <p className="task-empty">No tasks yet. Create one to start.</p>;
  }

  const animationDuration = Math.max(12, tasks.length * 4);

  return (
    <section className="task-carousel">
      <div
        className="task-carousel-track"
        style={{ animationDuration: `${animationDuration}s` }}
      >
        <div className="task-carousel-group">
          {tasks.map((task) => (
            <div className="task-slide" key={task.id}>
              <TaskItem
                task={task}
                onToggle={() => onToggleTask(task.id)}
                onDelete={() => onDeleteTask(task.id)}
                onTaskUpdated={onTaskUpdated}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
