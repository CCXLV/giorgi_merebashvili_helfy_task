const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

export function TaskFilter({ filter, onFilterChange }) {
  return (
    <div className="task-filter flex items-center gap-2">
      {FILTERS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`task-filter-button ${filter === item.id ? "active" : ""}`}
          onClick={() => onFilterChange(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
