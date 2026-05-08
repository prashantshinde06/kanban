import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, openConfirmModal, closeConfirmModal, removeKanbanTask } from "@/redux/slices/kanban.slice";
import { REDUX_KEYS } from "@/_helpers/constants";
import GenericModal from "@/components/modal";

const TaskCard = ({ task, isDragging, onDragStart }) => {
  const dispatch = useDispatch();
  const { confirmModal } = useSelector((state) => state[REDUX_KEYS.KANBAN]);
  const createdDate = task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "N/A";

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(openConfirmModal(task.id));
  };

  const handleConfirmDelete = () => {
    dispatch(removeKanbanTask(task.id));
  };

  const handleCancelDelete = () => {
    dispatch(closeConfirmModal());
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(openModal(task));
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "#dc2626",
      medium: "#f59e0b",
      low: "#10b981",
    };
    return colors[priority] || "#6b7280";
  };

  const deleteModalButtons = [
    {
      name: "Cancel",
      onClickMethod: handleCancelDelete,
      className: "px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors font-medium",
    },
    {
      name: "Delete",
      onClickMethod: handleConfirmDelete,
      className: "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium",
    },
  ];

  return (
    <>
      <div
        className={`task-card ${isDragging ? "dragging" : ""}`}
        draggable
        onDragStart={(e) => onDragStart(e, task)}
      >
        <div className="task-card__header">
          <h4 className="task-card__title">{task.title}</h4>
          <span className="task-card__id">#{task.id}</span>
        </div>

        <p className="task-card__description">{task.description}</p>

        <div className="task-card__meta">
          {task.priority && (
            <span
              className="task-card__priority"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              {task.priority}
            </span>
          )}
          {task.assignee && (
            <span className="task-card__assignee">{task.assignee}</span>
          )}
        </div>

        {task.dueDate && (
          <div className="task-card__due-date">
            📅 {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}

        <div className="task-card__footer">
          <div className="task-card__date">
            <span className="task-card__date-label">Created</span>
            <span className="task-card__date-value">{createdDate}</span>
          </div>
          <div className="task-card__actions">
            <button
              className="task-card__btn task-card__btn--edit"
              onClick={handleEdit}
              title="Edit task"
            >
              ✎
            </button>
            <button
              className="task-card__btn task-card__btn--delete"
              onClick={handleDelete}
              title="Delete task"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <GenericModal
        showModal={confirmModal.isOpen && confirmModal.taskId === task.id}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        modalButtonList={deleteModalButtons}
      />
    </>
  );
};

export default TaskCard;
