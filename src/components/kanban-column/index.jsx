import React from "react";
import { useDispatch } from "react-redux";
import { moveTask } from "@/redux/slices/kanban.slice";
import TaskCard from "@/components/kanban-task-card";

const KanbanColumn = ({ status, title, tasks }) => {
  const dispatch = useDispatch();
  const [dragOverIndex, setDragOverIndex] = React.useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragStart = (e, task) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("sourceStatus", task.status);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    e.stopPropagation();
    
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    const sourceStatus = e.dataTransfer.getData("sourceStatus");

    // Move task to new status
    dispatch(moveTask({ taskId, newStatus: status }));
    setDragOverIndex(null);
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  return (
    <div className="kanban-column">
      <div className="kanban-column__header">
        <h3 className="kanban-column__title">{title}</h3>
        <span className="kanban-column__count">{tasks.length}</span>
      </div>

      <div
        className="kanban-column__content"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, tasks.length)}
      >
        {tasks.length === 0 ? (
          <div className="kanban-column__empty">
            <p>No tasks yet</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id}
              className={`kanban-column__item ${dragOverIndex === index ? "drag-over" : ""}`}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <TaskCard
                task={task}
                onDragStart={handleDragStart}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
