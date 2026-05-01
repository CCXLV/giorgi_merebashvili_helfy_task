import { useCallback, useEffect, useMemo, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { TaskFilter } from "./components/Task/Filter";
import { TaskList } from "./components/Task/List";
import { deleteTask, getTasks, toggleTask } from "./services/task";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [theme, setTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  );

  const loadTasks = useCallback(async () => {
    const data = await getTasks();
    setTasks(data);
  }, []);

  async function handleToggleTask(taskId) {
    await toggleTask(taskId);
    await loadTasks();
  }

  async function handleDeleteTask(taskId) {
    await deleteTask(taskId);
    await loadTasks();
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  }

  function handleSearchClear() {
    setSearchInput("");
    setSearchQuery("");
  }

  // If the request finishes after unmount, skip setTasks
  useEffect(() => {
    let isMounted = true;

    getTasks().then((data) => {
      if (isMounted) {
        setTasks(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync theme toggle to CSS variables via data-theme on <html>.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const preparedTasks = useMemo(() => {
    let currentTasks = tasks;

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      currentTasks = currentTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query),
      );
    }

    return [...currentTasks].sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortBy === "priority") {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, searchQuery, sortBy]);

  const filteredTasks = useMemo(() => {
    if (filter === "completed") {
      return preparedTasks.filter((task) => task.completed);
    }
    if (filter === "active") {
      return preparedTasks.filter((task) => !task.completed);
    }
    return preparedTasks;
  }, [filter, preparedTasks]);

  return (
    <main className="main">
      <div className="content">
        <Navbar
          onTaskCreated={loadTasks}
          theme={theme}
          onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <section className="task-section flex flex-col gap-4">
          <TaskFilter filter={filter} onFilterChange={setFilter} />
          <form className="task-tools" onSubmit={handleSearchSubmit}>
            <Input
              className="task-search-input"
              placeholder="Search by title or description..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <select
              className="input task-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
            <Button type="submit" className="primary-button">
              Search
            </Button>
            <Button type="button" onClick={handleSearchClear}>
              Clear
            </Button>
          </form>
          <TaskList
            tasks={filteredTasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onTaskUpdated={loadTasks}
          />
        </section>
      </div>
    </main>
  );
}

export default App;
