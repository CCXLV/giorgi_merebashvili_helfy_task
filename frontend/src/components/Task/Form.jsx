import { useRef, useEffect } from "react";
import z from "zod";
import { Input } from "../Input";
import { Button } from "../Button";

import { createTask, updateTask } from "../../services/task";

const PRIORITIES = ["low", "medium", "high"];

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(PRIORITIES),
});

export function TaskForm({ isOpen, closeDialog, onTaskCreated, taskToEdit }) {
  const formRef = useRef(null);

  useEffect(() => {
    const currentForm = formRef.current;

    if (isOpen && currentForm && taskToEdit) {
      currentForm.elements.title.value = taskToEdit.title;
      currentForm.elements.description.value = taskToEdit.description;
      currentForm.elements.priority.value = taskToEdit.priority;
    }

    return () => {
      if (currentForm) {
        currentForm.reset();
      }
    };
  }, [isOpen, taskToEdit]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!e.target.reportValidity()) {
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const result = formSchema.safeParse(data);

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    if (taskToEdit) {
      await updateTask(taskToEdit.id, result.data);
    } else {
      await createTask(result.data);
    }

    onTaskCreated?.();
    closeDialog();
  }

  return (
    <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2 form-field">
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          name="title"
          minLength={3}
          placeholder="Enter task name..."
          required
        />
      </div>
      <div className="flex flex-col gap-2 form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="input"
          placeholder="Task description..."
          required
        />
      </div>
      <div className="flex flex-col gap-2 form-field">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          className="input"
          defaultValue="medium"
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div
        className="flex items-center gap-4"
        style={{ justifyContent: "flex-end" }}
      >
        <Button onClick={closeDialog}>Cancel</Button>
        <Button type="submit" className="primary-button">
          {taskToEdit ? "Save" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
