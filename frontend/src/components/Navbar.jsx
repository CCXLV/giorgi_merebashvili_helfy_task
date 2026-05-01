import { Grid2X2Plus, Moon, Sun } from "lucide-react";
import { DialogContent } from "./Dialog";
import { useDialog } from "../hooks/use-dialog";
import { Button } from "./Button";
import { TaskForm } from "./Task/Form";

export function Navbar({ onTaskCreated, theme, onThemeToggle }) {
  const { dialogRef, isOpen, openDialog, closeDialog } = useDialog();

  return (
    <header className="navbar flex items-center justify-between">
      <h1>Task Manager</h1>
      <div className="navbar-actions flex items-center gap-2">
        <Button
          type="button"
          className="flex items-center justify-center"
          onClick={onThemeToggle}
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        <Button
          className="primary-button flex items-center gap-2"
          onClick={openDialog}
        >
          <Grid2X2Plus size={18} />
          Create Task
        </Button>
        <DialogContent dialogRef={dialogRef} onClose={closeDialog}>
          <h2>Create Task</h2>
          <TaskForm
            isOpen={isOpen}
            closeDialog={closeDialog}
            onTaskCreated={onTaskCreated}
          />
        </DialogContent>
      </div>
    </header>
  );
}
